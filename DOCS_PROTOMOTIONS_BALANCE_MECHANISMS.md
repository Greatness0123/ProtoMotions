# ProtoMotions Humanoid Passive Standing Stability & Balance Mechanisms Audit

This document provides a comprehensive technical audit of how ProtoMotions and standard MuJoCo humanoid physics setups achieve **passive standing stability**. It explains how humanoids are prevented from collapsing or falling under gravity at spawn/reset—even before any active AI policy or reinforcement learning (RL) controller begins running.

Specifically, this document outlines the exact physical configurations, initial state synchronization patterns, and geometric alignments used in ProtoMotions, and concludes with a step-by-step implementation guide in **TypeScript** for WebAssembly-based MuJoCo pipelines (`mujoco-wasm` / `mujoco-js`).

---

## 1. Pure Physical Stability Philosophy

Unlike many reinforcement learning frameworks that rely on artificial stabilization hacks (such as temporary root welds, mocap anchors, pelvic gravity-compensation, or external spring-damper stabilizers), **ProtoMotions relies 100% on pure physical stability**.

By utilizing a combination of:
1. Rigid, well-conditioned contact dynamics (high-friction, low-penetration feet).
2. Well-tuned rotor inertia/armatures and active joint damping (high PD feedback gains).
3. A pre-aligned standing posture (lowered Center of Mass directly over the base of support).
4. **Actuator synchronization at Frame 0** (eliminating the immediate-collapse pitfall).

ProtoMotions humanoids spawn and remain standing at perfect rest without any artificial external forces or anchor modifications.

---

## 2. MJCF XML Posture & Dynamic Parameters

To resist gravity and prevent rapid collapse, the physical properties of the humanoid's skeleton and actuators must be tuned to resist high-frequency perturbations and maintain structural rigidity.

### 2.1 Joint Damping, Armature, and Friction Loss

In a real robot or human body, joints possess structural rotor inertia (armature), Coulomb friction, and damping. In MuJoCo, these are represented as follows:

* **Joint Armature (`armature`):**
  Rotor inertia is crucial in rigid-body simulators to stabilize high-gain PD control. In ProtoMotions' G1 config, armatures are tailored per-joint based on physical motor specifications (e.g., `0.0036` to `0.0251` kg·m²). In the SOMA23 template, a default armature of `0.01` to `0.02` is applied across all joints. This inertia filters high-frequency joint oscillations and prevents numerical instability under high gains.
* **Passive Damping & Stiffness Zeroing:**
  In `MujocoSimulator._create_simulation()`, passive stiffness and damping defined directly on joints in the MJCF are **explicitly zeroed out**:
  ```python
  self.model.jnt_stiffness[:] = 0.0
  self.model.dof_damping[:] = 0.0
  ```
  *Why?* To prevent **double-counting**. Since ProtoMotions manages joint stiffness and damping actively via the actuator PD loops, any passive XML joint damping/stiffness would add to the control torque, creating a stiff, unrealistic model.
* **Coulomb Friction Loss (`frictionloss`):**
  Unlike damping, joint friction loss (`frictionloss` in XML, e.g., `0.1` in G1) is **not** zeroed out by the simulator:
  ```python
  # # Zero frictionloss (IsaacGym doesn't model this)
  # self.model.dof_frictionloss[dof_addr] = 0.0
  ```
  Keeping `frictionloss` active introduces small, non-linear Coulomb friction forces at rest, which actively help resist tiny tipping perturbations without power consumption.

### 2.2 Actuator Stiffness & PD Gains (Implicit PD Mode)

Under `ControlType.BUILT_IN_PD` (implicit PD control), MuJoCo's position actuators are configured to compute PD control torques internally at **every physics substep** (e.g. 1000Hz or 2000Hz), which is highly stable:

$$\tau = K_p (q_{target} - q) - K_d \dot{q}$$

In the compiled model, this is configured on each actuator by setting the affine bias and gain parameters:

```python
# Configure actuator as a stiff position/PD controller:
self.model.actuator_gainprm[act_idx, 0] = kp
self.model.actuator_biastype[act_idx] = 1  # mjBIAS_AFFINE (1)
self.model.actuator_biasprm[act_idx, 0] = 0.0
self.model.actuator_biasprm[act_idx, 1] = -kp
self.model.actuator_biasprm[act_idx, 2] = -kd
```

By enforcing high joint stiffness ($K_p = 500$ to $1000$ N·m/rad) and critical damping ($K_d = 50$ to $100$ N·m·s/rad) across hip, knee, and ankle joints, the rig behaves like a stiff spring-damper system at rest, standing upright like a mannequin.

### 2.3 Foot Geometry and Ground Contact Parameters

Preventing the feet from sliding, twisting, or punching through the floor is critical to passive standing.

* **AMP / SMPL Standard Box Feet:**
  In `amp_humanoid.xml`, the foot is represented as a single rigid box geom:
  ```xml
  <geom name="left_foot" type="box" pos="0.045 0 -0.0225" size="0.0885 0.045 0.0275" density="1141" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
  ```
* **G1 Multi-Collision Capsule Feet:**
  In `g1_holo_compat.xml`, the foot utilizes 7 capsule geoms arranged along the sole of the foot. Explicit `<contact><pair>` rules are defined between these individual geoms and the floor to maximize contact rigidity:
  ```xml
  <pair name="left_foot1_floor" geom1="left_foot1_collision" geom2="floor" solref="0.01 1" friction="0.8 0.8" />
  ```

#### Core Contact Parameters Explained:
1. **`friction="0.8 0.8"` (or `1.0 0.05 0.05`):** High sliding friction coefficient (`0.8` to `1.0`) prevents translational slipping. Torsional/rolling friction (`0.05` to `0.8`) resists twisting of the foot on the floor.
2. **`solref="0.01 1"` (or `0.015 1`):** Defines the constraint solver's time-constant and damping ratio. A very small time-constant (`0.01`s) ensures a highly rigid contact constraint that resolves penetrations rapidly, preventing the foot from bouncing or "clipping" into the floor.
3. **`solimp=".9 .99 .003"`:** The solver impedance curve. High initial impedance (`0.9` to `0.99`) ensures the contact behaves as a hard, inelastic collision, eliminating any "mushy" ground feeling.
4. **`condim="3"` (or overridden in `pair`):** Enforces 3-dimensional contact (normal force + 2D tangential friction). Without a high `condim`, feet slip frictionlessly.

### 2.4 Default Stance & Center of Mass (CoM) Alignment

Spawning a humanoid in a straight, vertical "T-pose" is highly unstable. In a T-pose:
1. Major lower-body joints (hips, knees, ankles) are near their mechanical limits or straight singularities, reducing control authority.
2. Any small tipping moment immediately pushes the projected CoM outside the narrow base of support.

ProtoMotions utilizes a **bent-knee default standing pose**. By applying specific default joint offsets, the robot's posture is geometrically aligned to maximize passive stability:

```python
DEFAULT_JOINT_POS = {
    ".*_hip_pitch_joint": -0.312,    # Flexed hip
    ".*_knee_joint": 0.669,          # Bent knee
    ".*_ankle_pitch_joint": -0.363,  # Flexed ankle (dorsiflexion)
}
```

#### Geometric CoM Alignment:
* **Lowering the CoM:** Bending the knee by `0.669` rad lowers the pelvic height (from $\approx 0.95$m to $0.8$m), lowering the humanoid's vertical center of mass.
* **Tipping Moment Cancellation:** Hip flexion (`-0.312` rad) offsets the knee flexion (`0.669` rad), pushing the pelvis slightly forward/backward to align the projected CoM precisely over the middle of the foot support polygon (base of support). Ankle pitch (`-0.363` rad) ensures the soles of the feet remain flat on the ground plane, eliminating any forward or backward tipping torque.

---

## 3. Initial State & Actuator Synchronization (Frame 0 Setup)

### 3.1 The Frame 0 Implicit PD Actuator Pitfall (CRITICAL)

The single most common cause of immediate humanoid collapse at reset is a **Frame 0 actuator mismatch**.

#### The Problem:
1. On environment reset, `data.qpos` is initialized to the stable default standing pose (e.g. knee joint = `0.669` rad).
2. However, the actuator targets in `data.ctrl` are typically initialized to `0.0` or cleared:
   ```python
   self.data.ctrl[:] = 0.0  # Common reset pattern
   ```
3. On the very first physics step (Frame 1), the implicit PD actuators see:
   $$\tau = K_p (q_{target} - q) = K_p (0.0 - 0.669) = -0.669 \cdot K_p$$
4. Since $K_p$ is high (e.g., $800$), the actuator exerts a **massive backward torque**, violently pulling the knee straight (to 0.0). This sudden snap throws the humanoid's CoM forward/downward, destabilizing the ground contacts and causing an immediate collapse under gravity.

#### The Solution (Actuator Sync):
On model reset (Frame 0), `data.ctrl` **must** be initialized to match the target standing posture joint angles (`qpos`), NOT `0.0`. This ensures that on the first physics step, the error term $(q_{target} - q)$ is exactly zero, exerting zero sudden restoring torque and letting the humanoid settle smoothly into its physical stance.

### 3.2 Gravity Compensation (`gravcomp`)
ProtoMotions does **not** apply any gravity compensation to the torso, pelvis, or any other body. `gravcomp` is omitted or set to `0.0` globally. By relying solely on stiff joint feedback, the physical realistic behavior is preserved, ensuring that policies trained in the environment transfer seamlessly to real hardware (where gravity compensation is not possible).

### 3.3 Velocity & Acceleration Initialization
To eliminate initial momentum that would tip the humanoid over immediately upon spawn, the linear and angular velocities of all bodies (`qvel`) and external forces (`qfrc_applied`) are zeroed out on reset:
```python
self.data.qvel[:] = 0.0
self.data.qfrc_applied[:] = 0.0
```

---

## 4. Root Fixation & Constraints (Pre-Policy / Warmup Phase)

Many humanoid control frameworks temporarily freeze the root body (pelvis) during spawn to let contact forces settle:
* **Welds:** Applying a temporary `<weld>` constraint between the pelvis and the worldbody.
* **Mocap:** Setting `mocap="true"` on the pelvis and holding it still for a few frames.

### ProtoMotions Pure Physical Warmup
ProtoMotions does **not** use welds, mocap, or artificial stabilizers during spawn.
* **The Warmup Phase (Reset Grace Period):** Instead of freezing the model, ProtoMotions allows the model to physically stand and settle under gravity. It implements a `reset_grace_period` (e.g., 5-10 frames) where task penalties (such as power consumption or joint velocity limits) are ignored or zeroed, letting the physical contacts and joint controllers settle naturally without throwing training spikes.
* **Why this is superior:** Releasing a weld or mocap anchor creates a sudden discontinuity (shock) in joint velocities and contact forces, often causing the policy to trip on frame 10. A pure physical warmup ensures there are no force discontinuities.

---

## 5. Key Parameter Values Table

Below is a quick-reference table summarizing the core dynamic and contact parameters across ProtoMotions' primary MJCF humanoid templates:

| Parameter Category | Parameter Name | AMP Humanoid | Soma23 Humanoid | Unitree G1 (BM) | Purpose in Passive Standing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Joint Inertia** | `armature` | `0.01` to `0.02` | `0.02` (default) | `0.0036` to `0.0251` | Filters high-frequency PD jitter; adds joint inertia. |
| **Joint Friction** | `frictionloss` | `0.0` (default) | `0.0` (default) | `0.03` to `0.1` | Coulomb friction resists tiny resting perturbations. |
| **Passive Damping**| `dof_damping` | `0.0` (Zeroed) | `0.0` (Zeroed) | `0.0` (Zeroed) | Avoids double-counting damping with active PD. |
| **PD Stiffness** | $K_p$ (hip, knee) | $400$ to $500$ | $500$ to $800$ | $56.9$ to $139.0$ | Keeps joints structurally rigid against gravity. |
| **PD Damping** | $K_d$ (hip, knee) | $40$ to $50$ | $50$ to $80$ | $2.2$ to $20.0$ | Damps joint motion; prevents elastic bouncing. |
| **Contact Dimension**| `condim` | `1` (Normal only) | `3` (Friction) | `3` (via Pair override) | Enables friction calculation on foot soles. |
| **Foot Friction** | `friction` | `1.0 0.05 0.05` | `0.8 0.6 0.4` | `0.8 0.8` (Pair) | Prevents foot sliding, twisting, or rotation. |
| **Solver Reference**| `solref` | `0.015 1` | `0.003 1` (tendon) | `0.01 1` (Pair) | Stiffens contacts; prevents clipping/bouncing. |
| **Solver Impedance**| `solimp` | `.9 .99 .003` | Default | Default | Hardens floor collisions; removes mushy behavior. |

---

## 6. Step-by-Step TypeScript / WebAssembly Integration Guide

To spawn your bipedal humanoid mannequin in a completely stable standing posture within your WebAssembly + Three.js + MuJoCo environment, follow this implementation guide for `MJCFHumanoidTemplate.ts` and `PhysicsEngine.ts`.

### Step 1: Configure Your MJCF Feet for Stiff Contacts
Ensure your `MJCFHumanoidTemplate.ts` generates foot geoms with high-friction, stiff-collision parameters. If using a multi-point collision model, add explicit contact pairs.

```typescript
// MJCFHumanoidTemplate.ts
export function generateFootContactMarkup(): string {
  return `
    <contact>
      <!-- Configure stiff, high-friction contacts between feet and the ground plane -->
      <pair name="left_sole_ground" geom1="left_foot_geom" geom2="floor" friction="1.0 0.8 0.05 0.05" solref="0.01 1" solimp="0.9 0.99 0.003" />
      <pair name="right_sole_ground" geom1="right_foot_geom" geom2="floor" friction="1.0 0.8 0.05 0.05" solref="0.01 1" solimp="0.9 0.99 0.003" />
    </contact>
  `;
}
```

### Step 2: Configure Actuators as Position (PD) Controllers
In `PhysicsEngine.ts`, after loading the model, dynamically convert motor actuators into implicit position/PD controllers using MuJoCo's affine bias types.

```typescript
// PhysicsEngine.ts
import { MjModel, MjData } from './mujoco_types'; // Your WASM MuJoCo binding types

export function configureActuatorsForPD(model: MjModel, jointGains: Record<string, { kp: number, kd: number, effort: number }>) {
  const nu = model.nu; // Number of actuators

  for (let actIdx = 0; actIdx < nu; actIdx++) {
    // 1. Get corresponding joint ID
    const jntId = model.actuator_trnid[actIdx * 2]; // trnid is 2-element array [joint_id, ...]

    // 2. Fetch joint name from MuJoCo string table
    const jntName = getJointName(model, jntId);
    const gains = jointGains[jntName] || { kp: 500.0, kd: 50.0, effort: 300.0 };

    // 3. Configure implicit PD position-control parameters
    // force = gainprm[0] * ctrl + biasprm[0] + biasprm[1] * q + biasprm[2] * qd
    //       = kp * ctrl + 0 + (-kp) * q + (-kd) * qd
    model.actuator_gainprm[actIdx * 10] = gains.kp;       // gainprm[0] = kp
    model.actuator_biastype[actIdx] = 1;                  // mjBIAS_AFFINE (1)
    model.actuator_biasprm[actIdx * 10 + 0] = 0.0;        // biasprm[0] = 0
    model.actuator_biasprm[actIdx * 10 + 1] = -gains.kp;  // biasprm[1] = -kp
    model.actuator_biasprm[actIdx * 10 + 2] = -gains.kd;  // biasprm[2] = -kd

    // 4. Set joint output effort/torque limits
    model.actuator_forcerange[actIdx * 2 + 0] = -gains.effort; // Min torque
    model.actuator_forcerange[actIdx * 2 + 1] = gains.effort;  // Max torque

    model.actuator_ctrllimited[actIdx] = 0; // Do not limit control value (it's position)
    model.actuator_forcelimited[actIdx] = 1; // Limit actuator torque output
  }
}

function getJointName(model: MjModel, jointId: number): string {
  // Direct WebAssembly helper to extract joint name from model.names
  const nameAddr = model.name_jntadr[jointId];
  let name = "";
  let char = model.names[nameAddr];
  let offset = 0;
  while (char !== 0) {
    name += String.fromCharCode(char);
    offset++;
    char = model.names[nameAddr + offset];
  }
  return name;
}
```

### Step 3: Zero Out Passive Forces
To ensure only your active PD controller determines stiffness and damping, zero out the passive joint parameters.

```typescript
// PhysicsEngine.ts
export function zeroPassiveForces(model: MjModel) {
  // Zero passive stiffness on all joints
  const njnt = model.njnt;
  for (let i = 0; i < njnt; i++) {
    model.jnt_stiffness[i] = 0.0;
  }

  // Zero passive DOF damping
  const nv = model.nv;
  for (let i = 0; i < nv; i++) {
    model.dof_damping[i] = 0.0;
  }
}
```

### Step 4: Synchronize Actuators on Reset (Frame 0)
When spawning or resetting the humanoid, initialize the root height and joint positions in `data.qpos` to the bent-knee posture. **Immediately** copy those same posture joint values into `data.ctrl` to prevent Frame 1 collapse torque.

```typescript
// PhysicsEngine.ts
export interface JointPose {
  jointName: string;
  position: number;
}

export function resetHumanoidToStandingStance(
  model: MjModel,
  data: MjData,
  spawnHeight: number,
  defaultPose: Record<string, number>
) {
  // 1. Zero out all initial velocities and force buffers
  data.qvel.fill(0.0);
  data.qfrc_applied.fill(0.0);
  data.ctrl.fill(0.0);

  // 2. Set root pelvis position (Hips) and orientation (Freejoint: 7 elements [x,y,z, qw,qx,qy,qz])
  data.qpos[0] = 0.0;          // Pelvis X
  data.qpos[1] = 0.0;          // Pelvis Y
  data.qpos[2] = spawnHeight;  // Pelvis Z (e.g. 0.8m for G1, 0.95m for SOMA)

  data.qpos[3] = 1.0;          // qw (Identity quaternion)
  data.qpos[4] = 0.0;          // qx
  data.qpos[5] = 0.0;          // qy
  data.qpos[6] = 0.0;          // qz

  // 3. Populate joint positions in qpos (starting at index 7, after the free joint)
  const nq = model.nq;
  const dofStart = 7; // Index after free joint root pose

  for (let jntId = 0; jntId < model.njnt; jntId++) {
    const jntType = model.jnt_type[jntId];
    if (jntType === 0) continue; // Skip free joint (type freejoint = 0)

    const jntName = getJointName(model, jntId);
    const qposAddr = model.jnt_qposadr[jntId];

    // Retrieve target stance angle (default to 0.0 if not specified)
    const targetAngle = defaultPose[jntName] || 0.0;
    data.qpos[qposAddr] = targetAngle;
  }

  // 4. Recompute Forward Kinematics to update body structures
  // Equivalent to mujoco.mj_forward()
  mujoco.mj_forward(model, data);

  // 5. CRITICAL: Initialize data.ctrl to match the initial qpos values
  // This aligns the PD controller's targets to the initial state immediately.
  for (let actIdx = 0; actIdx < model.nu; actIdx++) {
    const jntId = model.actuator_trnid[actIdx * 2];
    const qposAddr = model.jnt_qposadr[jntId];

    // Set actuator control target (ctrl) to match starting joint position (qpos)
    const startingJointAngle = data.qpos[qposAddr];
    data.ctrl[actIdx] = startingJointAngle;
  }

  // 6. Run another forward pass to populate contact/actuator force arrays
  mujoco.mj_forward(model, data);
}
```

### Step 5: Execute the Physics Step Loop
In your main simulation update loop, advance the simulation step-by-step using standard decimation (e.g., calling `mj_step` 4 times per render frame to match a 200Hz physics loop in a 50Hz render cycle).

```typescript
// PhysicsEngine.ts
export class PhysicsEngine {
  private model: MjModel;
  private data: MjData;
  private decimation: number = 4; // 4 physics substeps per frame

  constructor(model: MjModel, data: MjData) {
    this.model = model;
    this.data = data;
  }

  public step(policyActions: number[] | null) {
    // If a policy provides new joint targets, apply them to data.ctrl
    if (policyActions !== null) {
      for (let actIdx = 0; actIdx < this.model.nu; actIdx++) {
        this.data.ctrl[actIdx] = policyActions[actIdx];
      }
    }

    // Step physics with decimation (substepping)
    for (let sub = 0; sub < this.decimation; sub++) {
      // In implicit PD mode, MuJoCo evaluates:
      // force = kp * (ctrl - qpos) - kd * qvel
      // at every substep inside mj_step.
      mujoco.mj_step(this.model, this.data);
    }
  }
}
```
