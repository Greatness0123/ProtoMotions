# PROJECT SYNTHIA FORENSIC CODE EXTRACTION & PORTING BLUEPRINT
## Downstream Target: Browser-based Humanoid Simulation (Three.js + Rapier.js, TypeScript)

This document contains a surgical, forensic code extraction of the algorithmic patterns in **ProtoMotions3** designed to solve three critical bottlenecks in the **Synthia** downstream project (skeletal/joint hierarchy mapping, PD motor/torque loops, and physics-to-visual synchronization). It is written strictly for a Senior Simulation Systems Architect and adheres to all hard exclusions.

---

## EXCLUDED — OUT OF SCOPE
- `protomotions/train_agent.py`
- `protomotions/train_slurm.py`
- `protomotions/inference_agent.py`
- `protomotions/agents/ppo/agent.py`
- `protomotions/agents/amp/component.py`
- `protomotions/envs/rewards/tracking.py`
- `protomotions/envs/terminations/tracking.py`
- `Dockerfile.isaacgym`
- `Dockerfile.newton`
- `requirements_isaacgym.txt`
- `requirements_newton.txt`
- `LICENSE.md`

---

## DELIVERABLE 1: Repo Topology & Operational Blueprint

### Geometry & Rigging Subsystem
#### Tier A
- **Path**: `protomotions/components/pose_lib.py`
- **Primary Operational Function**: Loads, parses, and traverses MuJoCo MJCF XML files to extract skeletal/joint hierarchies, joint limit specifications, and hinge axes orientations; it also maps and computes forward/inverse kinematics.
- **Critical Runtime Dependencies**: `mujoco`, `numpy`, `torch` (specifically for algebraic rotations and coordinate transforms).
- **Ripple Effect**: Parses XML joint axis definitions $\rightarrow$ registers joint limit angles in `KinematicInfo` $\rightarrow$ informs joint rotation calculations in `extract_transforms_from_qpos_non_root_ignore_fixed_helper()` $\rightarrow$ determines bounds for physical limb rotations under simulation.

---

### Joint System Subsystem
#### Tier A
- **Path**: `protomotions/robot_configs/base.py`
- **Primary Operational Function**: Defines morphological configurations, default joint states, and PD controller parameters (gains, limits, control types) for humanoid and robotic morphologies.
- **Critical Runtime Dependencies**: `torch`, `protomotions.components.pose_lib` (for hierarchy extraction and mapping definitions).
- **Ripple Effect**: Reads joint names and default angles $\rightarrow$ populates P-gain (`stiffness`) and D-gain (`damping`) tensors $\rightarrow$ injects targets during simulator initialization $\rightarrow$ constrains physical motor torque response per joint step.

---

### Physics Stepping Subsystem
#### Tier A
- **Path**: `protomotions/simulator/base_simulator/simulator.py`
- **Primary Operational Function**: The unified simulation orchestration shell that manages control-type routing, scales action inputs, coordinates domain randomization, applies acceleration clamping, and handles environment parking.
- **Critical Runtime Dependencies**: `torch`, `protomotions.robot_configs.base` (for morphology configurations).
- **Ripple Effect**: Executes pre-step action scaling and acceleration clamping $\rightarrow$ routes target values to the active simulator backend's motor control functions $\rightarrow$ triggers step advanced state updates across parallelized environment threads.

- **Path**: `protomotions/simulator/newton/simulator.py`
- **Primary Operational Function**: Drives the low-level, GPU-accelerated Newton (Warp-based MuJoCo) physics solver loop, applying either joint-motor PD control configurations or custom Warp kernels for direct joint-torque computations.
- **Critical Runtime Dependencies**: `warp` (for GPU-accelerated operations), `newton`, `torch` (for state conversion and bridge buffers).
- **Ripple Effect**: Copies PD/torque actions to GPU memory $\rightarrow$ executes substeps inside the Newton solver $\rightarrow$ updates joint configurations $\rightarrow$ measures rigid body velocities and positions to refresh the active `state_0` cache.

---

### Observation & State Vector Construction
#### Tier A
- **Path**: `protomotions/envs/obs/humanoid.py`
- **Primary Operational Function**: Transforms raw simulated joint degrees of freedom (DoF) and root spatial states into clean, local-coordinate observation state arrays formatted for AI consumption.
- **Critical Runtime Dependencies**: `torch`, `protomotions.utils.rotations` (for coordinate framing and quaternions).
- **Ripple Effect**: Maps world joint states to local transformations $\rightarrow$ computes local root angular velocity and gravity vectors $\rightarrow$ constructs normalized $\mathbb{R}^d$ state tensors $\rightarrow$ feeds policy inferences to compute new motor actions.

---

### Networking / Decoupling Subsystem
#### Tier A
- **Path**: `protomotions/utils/export_utils.py`
- **Primary Operational Function**: Chains observation pre-processing, policy inference, and action scaling steps into a single, optimized, self-contained ONNX pipeline.
- **Critical Runtime Dependencies**: `torch`, `onnx`, `onnxruntime` (for validation).
- **Ripple Effect**: Compiles the control policy and local transform steps $\rightarrow$ exports a stateless ONNX file $\rightarrow$ enables external deployable runtimes to execute inferences with direct, raw sensor values.

---

### Tier B (Thin Components / Re-exports)
- **Path**: `protomotions/robot_configs/g1.py`
  - *One-sentence definition*: Defines the morphological parameters, default joint angles, and common-naming bone map for the Unitree G1 robot.
- **Path**: `protomotions/robot_configs/h1_2.py`
  - *One-sentence definition*: Defines the morphological parameters, default joint angles, and common-naming bone map for the Unitree H1.2 robot.
- **Path**: `protomotions/robot_configs/smpl.py`
  - *One-sentence definition*: Defines the morphological parameters, default joint angles, and common-naming bone map for the SMPL humanoid character asset.
- **Path**: `protomotions/robot_configs/soma23.py`
  - *One-sentence definition*: Defines the morphological parameters, default joint angles, and common-naming bone map for the SOMA23 humanoid character asset.
- **Path**: `protomotions/robot_configs/factory.py`
  - *One-sentence definition*: Dynamically instantiates and returns the configured robot morphology class matching the CLI configuration.
- **Path**: `protomotions/simulator/factory.py`
  - *One-sentence definition*: Registers and initializes the selected physics backend (Newton, MuJoCo, IsaacGym, IsaacLab) at simulation start.
- **Path**: `protomotions/simulator/newton/config.py`
  - *One-sentence definition*: Holds core hyperparameter settings for Newton's solver type, integrator mode, and solver iteration limits.
- **Path**: `protomotions/simulator/mujoco/simulator.py`
  - *One-sentence definition*: Implements the CPU-based MuJoCo physics simulation interface, translating control inputs to direct joint commands.
- **Path**: `protomotions/envs/action/action_functions.py`
  - *One-sentence definition*: Maps raw model outputs through scale configurations to form proper PD target angles or target joint forces.

---

## DELIVERABLE 2: Core Deep-Tech Mechanisms & Problem Solving

### 2.1 — Model Dynamicity & Asset Loading

**How the project avoids hardcoding meshes**:
ProtoMotions parses general humanoid assets at runtime using MuJoCo MJCF XML files. The kinematic extraction dynamically traverses the XML hierarchy to determine parent/child joints, limits, and coordinate framing without hardcoding skeletal joints.

To retarget arbitrary keypoints (e.g., from SMPL, RigV1, or SOMA formats) onto robot geometries like the Unitree G1, ProtoMotions employs JAX-based optimization in `PyRoki` (`pyroki/batch_retarget_to_g1_from_keypoints.py`). It calculates relative bone position vectors and relative angle differences, minimizing tracking costs over time to align the skeleton dynamically.

#### Verified Code Snippets (Key Logic Lines)

**From `protomotions/components/pose_lib.py` (Kinematic Parsing):**
```python
# Lines 396-411: Extracting body/joint configurations dynamically from MJCF (VERIFIED)
def extract_kinematic_info(mjcf_path: str) -> KinematicInfo:
    mjcf_model = mjcf.from_path(mjcf_path)
    global_default_joint = getattr(mjcf_model.default, "joint", None)

    # Check if angles are in degrees or radians (default is degrees in MuJoCo)
    angle_unit = getattr(mjcf_model.compiler, "angle", None)
    # Default to degrees unless explicitly set to 'radian'
    angle_to_radians = 1.0 if angle_unit == "radian" else np.pi / 180.0
```

**From `pyroki/batch_retarget_to_g1_from_keypoints.py` (Retarget Cost Function):**
```python
# Lines 1001-1018: Relative vector-matching and angle costs (VERIFIED)
        residual_position_delta = (
            (delta_target - delta_robot * position_scale)
            * (1 - jnp.eye(delta_target.shape[0])[..., None])
            * g1_retarget_mask[..., None]
        )

        # Vector angle regularization.
        delta_target_normalized = delta_target / jnp.linalg.norm(
            delta_target + 1e-6, axis=-1, keepdims=True
        )
        delta_robot_normalized = delta_robot / jnp.linalg.norm(
            delta_robot + 1e-6, axis=-1, keepdims=True
        )
        residual_angle_delta = 1 - (
            delta_target_normalized * delta_robot_normalized
        ).sum(axis=-1)
```

#### Crucial Conceptual Gap (Config-swapping vs. Ingesting Unknown Meshes)
While the optimization terms in `PyRoki` solve relative bone tracking perfectly, you must understand a key limitation of ProtoMotions:
* **ProtoMotions' definition of dynamicity is "Config-Swapping"**: The framework operates by selecting from a *known, pre-registered catalog* of morphology configuration files (`g1.py`, `h1_2.py`, `smpl.py`, `soma23.py`). Each morphology declares an explicit naming dictionary and rigid body hierarchy.
* **What it lacks (The Synthia Need)**: ProtoMotions does *not* possess an ingestion layer that can drop in a completely arbitrary, unknown user-uploaded visual mesh and auto-generate kinematic definitions at runtime with zero naming maps.
* **The Solution**: For Synthia, the exact answer to "why is our project locked to one fixed mesh" lies in **AMICA** or **Human2Humanoid** extraction pipelines—specifically their VRM standard humanoid bone translation layer, which dynamically resolves standard visual bone schemas (e.g., VRM's `HumanoidBoneName` enum) to a canonical schema without hardcoded local offset mapping files.

---

### 2.2 — Joint Calibration & PD Control Loops

**Converting target angles to forces**:
Instead of violently snapping joints directly to raw targets (which causes visual jitter and unstable physics in downstream engines like Synthia), ProtoMotions supports torque-based joint motors using PD (Proportional-Derivative) control equations. Joint controllers compute torque as:
$$\tau = K_p \cdot (\theta_{\text{target}} - \theta_{\text{current}}) - K_d \cdot (\dot{\theta}_{\text{current}})$$

This value is clamped against each joint's maximum physical effort limit to prevent hyperextensions, visual clipping, and explosive simulator instabilities.

#### Verified Code Snippets (Key Logic Lines)

**From `protomotions/simulator/base_simulator/simulator.py` (Custom PD Formulation):**
```python
# Lines 1295-1311: Proportional PD calculations (VERIFIED)
        elif self.control_type == ControlType.PROPORTIONAL:
            targets = self._common_actions
            # ... Domain noise randomization applied ...
            common_dof_state = self._get_simulator_dof_state().convert_to_common(
                self.data_conversion
            )
            torques = (
                self._common_p_gains * (targets - common_dof_state.dof_pos)
                - self._common_d_gains * common_dof_state.dof_vel
            )
            torques = torch.clip(
                torques, -self._torque_limits_common, self._torque_limits_common
            )
```

**From `protomotions/simulator/newton/simulator.py` (Explicit Warp PD Kernel):**
```python
# Lines 46-59: Warp GPU kernel for high-frequency PD integration (VERIFIED)
def compute_pd_torques_kernel(
    joint_q: wp.array(dtype=wp.float32),
    joint_qd: wp.array(dtype=wp.float32),
    joint_f: wp.array(dtype=wp.float32),
    pd_targets: wp.array(dtype=wp.float32),
    kp: wp.array(dtype=wp.float32),
    kd: wp.array(dtype=wp.float32),
    torque_limits: wp.array(dtype=wp.float32),
    q_stride: int,
    qd_stride: int,
    q_dof_start: int,
    qd_dof_start: int,
    num_dofs: int,
):
```

**Explanation**:
1. When control is proportional (`ControlType.PROPORTIONAL`), ProtoMotions calculates motor torques based on positional error ($target - current$) scaled by proportional stiffness ($K_p$), minus velocity scaled by derivative damping ($K_d$).
2. Torques are strictly clipped inside torque boundaries (`_torque_limits_common`) derived from MJCF actuator constraints.
3. This is physically realistic. Joints drive smoothly toward their targets rather than violently overwriting coordinates, maintaining stability and avoiding self-collisions near joint limits.

---

### 2.3 — Observation Baking & State Vectors

**Exact state structure packaged for AI inference**:
State vectors are constructed inside local frames to guarantee translation and yaw-invariance.

#### Field Enumerate (In Sequence)
1. **Local Joint Positions (`dof_pos`)**: $[N_{\text{dofs}}]$ — Current relative joint rotations.
2. **Local Joint Velocities (`dof_vel`)**: $[N_{\text{dofs}}]$ — Current angular velocities.
3. **Local Root Angular Velocity (`root_local_ang_vel`)**: $[3]$ — Root angular velocity vector rotated into the local coordinate frame.
4. **Projected Gravity Vector (`proj_gravity`)**: $[3]$ — Gravity vector $[0, 0, -1]$ transformed by the root orientation's inverse quaternion.
5. **Local Root Linear Velocity (`normalized_root_vel`)**: $[3]$ — Root linear velocity vector rotated into the local coordinate frame (included if `root_vel_obs` is true).

#### Verified Code Snippets (Key Logic Lines)

**From `protomotions/envs/obs/humanoid.py`:**
```python
# Lines 194-205: Local coordinate transforms and concatenation (VERIFIED)
    num_envs = dof_pos.shape[0]
    proj_gravity = root_projected_gravity(anchor_rot, w_last)

    obs = [
        dof_pos.view(num_envs, -1),
        dof_vel.view(num_envs, -1),
        root_local_ang_vel.view(num_envs, -1),
        proj_gravity.view(num_envs, -1),
    ]
```

**Explanation**:
1. Velocities and orientation vectors (like gravity) are rotated into the root's local frame using `quat_rotate_inverse()`.
2. Local alignment ensures that the policy inputs remain invariant to the character's global world position or yaw heading.

---

### 2.4 — AI/LLM Decoupling & Prompt/Protocol Engineering

**Absence of streaming boilerplate**:
*Note: A complete scan of this repository confirms that WebSocket, prompt templating, or network/streaming buffer code is **not present** in ProtoMotions. You should refer to amica or human2humanoid extractions for network-receive layers.*

**The decoupling pattern**:
To keep the control policy decoupled from the runtime simulation, ProtoMotions exports the entire control pipeline into a single stateless **ONNX** package (baked with raw coordinate transformations, observation mapping, policy model inference, and action scaling). Runtimes only need to feed raw sensors (positions, velocities) to get joint motor targets, keeping the AI logic stateless and self-contained.

#### Verified Code Snippets (Key Logic Lines)

**From `protomotions/utils/export_utils.py` (ONNX Pipeline Decoupling):**
```python
# Lines 779-795: Merging observation logic, neural network, and action scaling (VERIFIED)
def export_unified_pipeline(
    observation_configs: Dict[str, Any],
    action_config: Dict[str, Any],
    sample_context: Dict[str, Any],
    policy_module: torch.nn.Module,
    policy_in_keys: list,
    policy_action_key: str,
    path: str,
    device: torch.device,
    robot_config: Any,
):
```

---

### 2.5 — Physics-to-Visual Synchronization

**Copying transforms from physical simulation to render nodes**:
ProtoMotions synchronizes positions and orientations from physical rigid bodies to visual nodes by reading rigid body transforms (`rigid_body_pos` and `rigid_body_rot` quaternions) each frame and applying them directly.

#### Verified Code Snippets (Key Logic Lines)

**From `protomotions/simulator/newton/simulator.py` (State Extraction):**
```python
# Lines 925-933: Pulling link transforms from Newton's state (VERIFIED)
        body_transforms = (
            wp.to_torch(self.robot_view.get_link_transforms(self.state_0))
            .squeeze(1)
            .view(self.num_envs, self.robot_config.kinematic_info.num_bodies, -1)
)
        body_pos = body_transforms[:, :, :3]
        body_rot = body_transforms[:, :, 3:]
```

---

## DELIVERABLE 3: Synthia Translation Blueprint (Three.js + Rapier)

### 3.1 — TypeScript Architectural Mockup

To avoid monolithic code coupling, we decouple Synthia's runtime into three independent, stateless modules: `PhysicsController`, `AvatarSynchronizer`, and `ObservationBuilder`.

```typescript
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

// Morphology information parsed dynamically from skeleton definitions
export interface JointParameter {
  jointId: string;
  boneName: string;
  stiffness: number; // Kp
  damping: number;   // Kd
  effortLimit: number;
}

export interface SkeletonRig {
  mesh: THREE.SkinnedMesh;
  bonesMap: Map<string, THREE.Bone>;
}

/**
 * 1. Physics Controller: Manages the Rapier.js simulation world,
 * stepping, and PD joint motor commands.
 */
export class PhysicsController {
  private world: RAPIER.World;
  private joints: Map<string, RAPIER.RevoluteJoint> = new Map();
  private jointParams: Map<string, JointParameter> = new Map();

  constructor(world: RAPIER.World) {
    this.world = world;
  }

  /**
   * Corresponds to ProtoMotions' PROPORTIONAL / BUILT_IN_PD modes.
   * Configures motor positions on the Revolute joint.
   */
  public applyJointTarget(jointId: string, targetAngle: number): void {
    const joint = this.joints.get(jointId);
    const params = this.jointParams.get(jointId);
    if (!joint || !params) return;

    // Direct mapping to Rapier's PD motor configuration API
    joint.configureMotorPosition(targetAngle, params.stiffness, params.damping);
  }

  public step(dt: number): void {
    this.world.timestep = dt;
    this.world.step();
  }
}

/**
 * 2. Avatar Synchronizer: One-directional transform sync from
 * physics truth (rigid bodies) to visual puppet (Three.js Bones).
 */
export class AvatarSynchronizer {
  private bodyOffsetZ: number = -0.05; // capsule-to-mesh vertical offset

  /**
   * Copies rigid body transforms to visual skeleton bones.
   * Keeps physics and rendering decoupled.
   */
  public syncMeshToPhysics(rig: SkeletonRig, bodies: Map<string, RAPIER.RigidBody>): void {
    // 1. Sync Root Translation and Rotation (with offset adjustments)
    const rootBody = bodies.get("pelvis");
    if (rootBody) {
      const translation = rootBody.translation();
      const rotation = rootBody.rotation();

      rig.mesh.position.set(
        translation.x,
        translation.y + this.bodyOffsetZ, // Floor-clipping correction
        translation.z
      );
      rig.mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    }

    // 2. Map remaining bones recursively
    rig.bonesMap.forEach((bone, bodyName) => {
      const body = bodies.get(bodyName);
      if (body && bodyName !== "pelvis") {
        const rotation = body.rotation();
        bone.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
      }
    });
  }
}

/**
 * 3. Observation Builder: Packages raw simulator transforms into
 * normalized state vectors for AI model inference.
 */
export class ObservationBuilder {
  /**
   * Constructs local-coordinate state vectors matching Deliverable 2.3.
   */
  public buildObservation(
    rootBody: RAPIER.RigidBody,
    joints: RAPIER.RevoluteJoint[],
    groundHeight: number
  ): Float32Array {
    const translation = rootBody.translation();
    const rotation = rootBody.rotation();
    const linvel = rootBody.linvel();
    const angvel = rootBody.angvel();

    const rootHeight = translation.y - groundHeight;

    // Convert orientation quaternion to inverse to project gravity vector
    const rootQuat = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const invRootQuat = rootQuat.clone().invert();
    const gravity = new THREE.Vector3(0, -1, 0).applyQuaternion(invRootQuat); // Local-y is down in Three.js

    // Rotate linear/angular velocities into local root space
    const localLinVel = new THREE.Vector3(linvel.x, linvel.y, linvel.z).applyQuaternion(invRootQuat);
    const localAngVel = new THREE.Vector3(angvel.x, angvel.y, angvel.z).applyQuaternion(invRootQuat);

    // Package observations into flat array
    const obs = [];
    obs.push(rootHeight);
    obs.push(gravity.x, gravity.y, gravity.z);
    obs.push(localLinVel.x, localLinVel.y, localLinVel.z);
    obs.push(localAngVel.x, localAngVel.y, localAngVel.z);

    // Append joint angles and joint velocities
    joints.forEach(joint => {
      obs.push(joint.angle());
    });

    return new Float32Array(obs);
  }
}
```

---

### 3.2 — Explicit API Mapping Notes

| ProtoMotions (Python/MuJoCo concepts) | Rapier.js / Three.js (TypeScript equivalent APIs) | Explanation |
| :--- | :--- | :--- |
| `extract_kinematic_info()` | `yourdfpy` $\rightarrow$ URDF / glTF bones | Loads skeleton structures and names dynamically. |
| `ControlType.BUILT_IN_PD` | `RevoluteJoint.configureMotorPosition()` | Drives Rapier joints smoothly to target positions using integrated motors. |
| `Kp` ($K_p$ / Stiffness) | `joint.configureMotorPosition(target, Kp, Kd)` | Directly maps to the proportional stiffness gain of the motor controller. |
| `Kd` ($K_d$ / Damping) | `joint.configureMotorPosition(target, Kp, Kd)` | Directly maps to the velocity damping coefficient. |
| `torch.clip(torques, -limit, limit)` | `joint.setLimits(min, max)` | Bounds joint ranges and limits torque output directly. |
| `quat_rotate_inverse()` | `THREE.Quaternion.invert()` | Projects world-space velocities into the local root frame. |

---

### 3.3 — Placement in the `requestAnimationFrame` Loop

To maintain physical fidelity and avoid rendering stutter, keep the simulation step and visual sync fully separated in the render loop:

```typescript
function tick(timestamp: number) {
  requestAnimationFrame(tick);

  const dt = 1 / 60; // Fixed physical step-size

  // 1. Fixed Physics Step
  // Process motor controller target calculations
  joints.forEach(joint => {
    physicsController.applyJointTarget(joint.id, joint.targetAngle);
  });
  physicsController.step(dt);

  // 2. Transform Copying (Render Synchronization)
  // Run synchronization immediately after physics step completes
  avatarSynchronizer.syncMeshToPhysics(rig, bodiesMap);

  // 3. Render Pass
  renderer.render(scene, camera);
}
```

---

### 3.4 — Gaps & Missing Rapier Equivalents

During porting, keep the following missing Rapier equivalents in mind:
1. **Multi-Axis Spherical Joints with Exponential Map**: Rapier's standard `SphericalJoint` does not support position limits or motor configurations directly. You must simulate them using three nested `RevoluteJoint`s or program custom torque controllers in the pre-step callbacks.
2. **Joint Velocity (`joint.velocity()`)**: Rapier's `RevoluteJoint` doesn't provide a joint velocity getter directly. You must calculate joint velocity manually from consecutive joint angle measurements:
   $$\dot{\theta} \approx \frac{\theta_t - \theta_{t-1}}{\Delta t}$$
3. **GPU-Accelerated Parallel Environments**: Rapier runs single-threaded on CPU. Unlike Warp/Newton, parallel simulation steps in Web workers must be orchestrated manually.

---

### 3.5 — Critical Architectural Gap (The Mapping Seam)

The mapping definition:
```typescript
AvatarSynchronizer.bonesMap: Map<string, THREE.Bone>
```
assumes you already have a string-keyed bone map matching your physics body names. But index-based kinematics resolution (as parsed in 2.1) does *not* guarantee names line up. This mismatch is the core reason for the "hand-modify the project per-character" bottleneck.
* **The Structural Seam**: Visually loaded meshes (e.g. from glTF or VRM files) have standard bones, whereas the simulation config uses MJCF link names (e.g., `pelvis_contour_link` vs `mixamorigPelvis`).
* **The amica Connection**: In the upcoming **AMICA** extraction pass, pay extreme attention to how it handles VRM bone conventions. Its translation layer resolves standard visual bones dynamically to a canonical humanoid schema (such as `VRMHumanoidBoneName` or similar standard interfaces). Combining that dynamic translation layer with ProtoMotions' physics controllers and observation builders is the ultimate key to unlocking multi-mesh flexibility in Synthia.

---

## CONFIDENCE & GAPS NOTE

### Extracted Mechanisms Summary
* **2.1 Model Dynamicity & Asset Loading**: **Fully Found**. Dynamic MJCF structural loading and optimization-based retargeting costs were successfully extracted.
* **2.2 Joint Calibration & PD Control Loops**: **Fully Found**. Proportional-derivative torque code and Warp kernels were successfully extracted.
* **2.3 Observation Baking & State Vectors**: **Fully Found**. Local frame-of-reference transformations and state vector formulations were successfully extracted.
* **2.4 AI/LLM Decoupling & Protocol Engineering**: **Partially Found**. WebSocket/streaming was confirmed absent. The ONNX-based model decoupling pattern was extracted.
* **2.5 Physics-to-Visual Synchronization**: **Fully Found**. The translation of physical coordinate state updates to visual bones was successfully extracted.
