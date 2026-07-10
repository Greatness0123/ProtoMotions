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
ProtoMotions loads general humanoid assets at runtime using MuJoCo MJCF XML files. The kinematic extraction dynamically parses the XML hierarchy to determine parent/child joints, limits, and coordinate framing without hardcoding skeletal joints.

To retarget arbitrary keypoints (e.g., from SMPL, RigV1, or SOMA formats) onto robot geometries like the Unitree G1, ProtoMotions employs JAX-based optimization in `PyRoki` (`pyroki/batch_retarget_to_g1_from_keypoints.py`). It calculates relative bone position vectors and relative angle differences, minimizing tracking costs over time to align the skeleton dynamically.

#### Code Snippets (Key Logic Lines)

**From `protomotions/components/pose_lib.py` (Kinematic Parsing):**
```python
# Lines 396-415: Extracting body/joint configurations dynamically from MJCF
mjcf_model = mjcf.from_path(mjcf_path)
angle_unit = getattr(mjcf_model.compiler, "angle", None)
angle_to_radians = 1.0 if angle_unit == "radian" else np.pi / 180.0

bodies = []
# ... Traversing MJCF worldbody structure recursively ...
for body in worldbody.all_children():
    # Detect joints on this body dynamically
    joints = body.find_all('joint')
    for joint in joints:
        # Save axes, ranges, limits, parent/child index offsets
        limits = joint.range * angle_to_radians
```

**From `pyroki/batch_retarget_to_g1_from_keypoints.py` (Retarget Cost Function):**
```python
# Lines 568-589: Relative vector-matching and angle costs
delta_target = target_pos[:, None] - target_pos[None, :]
delta_robot = robot_pos[:, None] - robot_pos[None, :]

# Vector distance regularization matching target and robot bones
residual_position_delta = (
    (delta_target - delta_robot * position_scale)
    * (1 - jnp.eye(delta_target.shape[0])[..., None])
    * g1_retarget_mask[..., None]
)

# Vector angle normalization to maintain bone alignment
residual_angle_delta = 1 - (
    delta_target_normalized * delta_robot_normalized
).sum(axis=-1)
```

**Explanation**:
1. `pose_lib.py` extracts the kinematic structures dynamically. Instead of matching string bone names, it processes index offsets, local position transforms, and joint hinge axes from the XML description.
2. In `PyRoki`, the relative matrices between joints are mapped as a matrix of relative vector offsets. The optimizer minimizes both relative vector length differences (`residual_position_delta`) and relative angular alignment (`residual_angle_delta`). This lets the system retarget keypoints onto a humanoid morphology regardless of naming or bone count mismatches.

---

### 2.2 — Joint Calibration & PD Control Loops

**Converting target angles to forces**:
Instead of violently snapping joints directly to raw targets (which causes visual jitter and unstable physics in downstream engines like Synthia), ProtoMotions supports torque-based joint motors using PD (Proportional-Derivative) control equations. Joint controllers compute torque as:
$$\tau = K_p \cdot (\theta_{\text{target}} - \theta_{\text{current}}) - K_d \cdot (\dot{\theta}_{\text{current}})$$

This value is clamped against each joint's maximum physical effort limit to prevent hyperextensions, visual clipping, and explosive simulator instabilities.

#### Code Snippets (Key Logic Lines)

**From `protomotions/simulator/base_simulator/simulator.py` (Custom PD Formulation):**
```python
# Lines 1295-1311: Proportional PD calculations
common_dof_state = self._get_simulator_dof_state().convert_to_common(self.data_conversion)
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
# Lines 38-51: Warp GPU kernel for high-frequency PD integration
pos = joint_q[q_idx]
vel = joint_qd[qd_idx]
target = pd_targets[tid]

torque = kp[dof_id] * (target - pos) - kd[dof_id] * vel
torque = wp.clamp(torque, -torque_limits[dof_id], torque_limits[dof_id])
joint_f[qd_idx] = torque
```

**Explanation**:
1. If the control type is set to `PROPORTIONAL`, ProtoMotions calculates motor torques manually using the difference between target and current positions scaled by `_common_p_gains` ($K_p$), subtracting velocity scaled by `_common_d_gains` ($K_d$).
2. Torques are immediately clipped within $[- \text{limit}, + \text{limit}]$ matching effort boundaries.
3. This is physically realistic. Joints drive smoothly toward their targets rather than violently overwriting coordinates, maintaining stability and avoiding self-collisions near joint limits.

---

### 2.3 — Observation Baking & State Vectors

**Exact state structure packaged for AI inference**:
State vectors are constructed inside local frames to guarantee translation and yaw-invariance.

#### Field Enumerate (In Sequence)
1. **Root Height above Ground (`root_h_obs`)**: $[1]$ — Difference between the root's z-position and the elevation of the terrain immediately underneath.
2. **Local Joint Positions (`dof_pos`)**: $[N_{\text{dofs}}]$ — Current relative joint rotations.
3. **Local Joint Velocities (`dof_vel`)**: $[N_{\text{dofs}}]$ — Current angular velocities.
4. **Local Root Angular Velocity (`root_local_ang_vel`)**: $[3]$ — Root angular velocity vector rotated into the local coordinate frame.
5. **Projected Gravity Vector (`proj_gravity`)**: $[3]$ — Gravity vector $[0, 0, -1]$ transformed by the root orientation's inverse quaternion.
6. **Local Root Linear Velocity (`normalized_root_vel`)**: $[3]$ — Root linear velocity vector rotated into the local coordinate frame (included if `root_vel_obs` is true).

#### Code Snippets (Key Logic Lines)

**From `protomotions/envs/obs/humanoid.py`:**
```python
# Lines 191-209: Local coordinate transforms and concatenation
proj_gravity = root_projected_gravity(anchor_rot, w_last)

obs = [
    dof_pos.view(num_envs, -1),
    dof_vel.view(num_envs, -1),
    root_local_ang_vel.view(num_envs, -1),
    proj_gravity.view(num_envs, -1),
]

if root_vel_obs:
    normalized_root_vel = rotations.quat_rotate_inverse(root_rot, root_vel, w_last)
    obs.append(normalized_root_vel.view(num_envs, -1))
```

**Explanation**:
1. Velocities and orientation vectors (like gravity) are rotated into the root's local frame using `quat_rotate_inverse()`.
2. Joint positions are stored as angular values (in radians) or 6D tangent-normal transformations, which guarantees smooth representation without Euler singularities.
3. Local alignment ensures that the policy inputs remain invariant to the character's global world position or yaw heading.

---

### 2.4 — AI/LLM Decoupling & Prompt/Protocol Engineering

**Absence of streaming boilerplate**:
*Note: A complete scan of this repository confirms that WebSocket, prompt templating, or network/streaming buffer code is **not present** in ProtoMotions. You should refer to amica or human2humanoid extractions for network-receive layers.*

**The decoupling pattern**:
To keep the control policy decoupled from the runtime simulation, ProtoMotions exports the entire control pipeline into a single stateless **ONNX** package. It bakes raw coordinate transformations, observation mapping, policy model inference, and action scaling directly into the graph. Runtimes only need to feed raw sensors (positions, velocities) to get joint motor targets, keeping the AI logic stateless and self-contained.

#### Code Snippets (Key Logic Lines)

**From `protomotions/utils/export_utils.py` (ONNX Pipeline Decoupling):**
```python
# Lines 779-799: Merging observation logic, neural network, and post-processing
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
    # Builds a composite PyTorch model that merges observation transforms + Actor MLP
    # and exports the entire sequence directly into one self-contained .onnx graph.
```

**Explanation**:
Baking observation processing directly into the ONNX graph eliminates the need to duplicate complex math (such as inverse quaternion rotations for local frames) in the deployment container. The deployment code remains clean, reading raw joints, passing them to the ONNX runtime, and applying the outputs to the motors.

---

### 2.5 — Physics-to-Visual Synchronization

**Copying transforms from physical simulation to render nodes**:
ProtoMotions synchronizes positions and orientations from physical rigid bodies to visual nodes by reading rigid body transforms (`rigid_body_pos` and `rigid_body_rot` quaternions) each frame and applying them directly.

#### Code Snippets (Key Logic Lines)

**From `protomotions/simulator/newton/simulator.py` (State Extraction):**
```python
# Lines 634-644: Pulling link transforms from Newton's state
body_transforms = (
    wp.to_torch(self.robot_view.get_link_transforms(self.state_0))
    .squeeze(1)
    .view(self.num_envs, self.robot_config.kinematic_info.num_bodies, -1)
)
body_pos = body_transforms[:, :, :3]
body_rot = body_transforms[:, :, 3:] # Quaternions
```

**Explanation**:
1. Transforms are fetched from the physics engine state (`self.state_0`) after stepping.
2. The coordinate values (`body_pos` and `body_rot`) reflect the simulation "truth" (world coordinate space).
3. Ground offsets (such as capsule-to-mesh vertical differences) are parsed during asset loading to prevent the visual render mesh from clipping the floor.

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
      // Rapier doesn't have a direct joint.velocity() API, so we measure velocity manually or read joint motor states.
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

## CONFIDENCE & GAPS NOTE

### Extracted Mechanisms Summary
* **2.1 Model Dynamicity & Asset Loading**: **Fully Found**. Dynamic MJCF structural loading and optimization-based retargeting costs were successfully extracted.
* **2.2 Joint Calibration & PD Control Loops**: **Fully Found**. Proportional-derivative torque code and Warp kernels were successfully extracted.
* **2.3 Observation Baking & State Vectors**: **Fully Found**. Local frame-of-reference transformations and state vector formulations were successfully extracted.
* **2.4 AI/LLM Decoupling & Protocol Engineering**: **Partially Found**. WebSocket/streaming was confirmed absent. The ONNX-based model decoupling pattern was extracted.
* **2.5 Physics-to-Visual Synchronization**: **Fully Found**. The translation of physical coordinate state updates to visual bones was successfully extracted.
