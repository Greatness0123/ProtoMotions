# SYNTHIA ENGINEERING ANALYSIS & PORTING MANUAL
## Deconstructing NVIDIA ProtoMotion for Web-Native Three.js + Rapier3D ecosystems

This document provides a highly detailed, mathematically precise engineering analysis written for senior robotics engineers and physics simulation specialists. It breaks down the underlying physics, kinematics, and control equations that make the NVIDIA ProtoMotion framework move with exceptional fluidity, and translates those concepts directly into a web-native Three.js and Rapier3D ecosystem.

---

## Module 1: The Secrets of Fluid Movement

### 1. What Makes ProtoMotion Organic and Smooth
The organic, lifelike quality of ProtoMotion characters is not an aesthetic overlay—it is the natural byproduct of strictly conserving **mass, momentum, and rotational inertia** under a physical torque boundary.

In a standard rendering engine, character movement is driven by *kinematic interpolation* (re-evaluating `lerp` or `slerp` on bone transforms every frame). This results in a "robotic" look because:
1. **Infinite Acceleration**: Kinematic animation allows instantaneous velocity changes. Joint velocities can experience step-discontinuities (infinite acceleration) because there is no simulated mass to restrict force.
2. **Zero Momentum/Inertia**: When a kinematic animation stops, the limb stops instantly. In reality, a heavy limb possesses momentum that must be decelerated smoothly.
3. **No Foot-Ground Reaction Force Integration**: Kinematic characters suffer from "moonwalking" or sliding because foot contacts do not affect root body momentum.

ProtoMotion prevents these issues by treating the character as an **articulated multi-body system** governed by classical Featherstone/Lagrangian dynamics:
$$M(q)\ddot{q} + C(q, \dot{q})\dot{q} + g(q) = \tau_{\text{applied}} + J^T f_{\text{external}}$$
Where:
- $M(q)$ is the joint-space mass matrix.
- $C(q, \dot{q})\dot{q}$ is the Coriolis and centrifugal force vector.
- $g(q)$ is the gravity vector.
- $\tau_{\text{applied}}$ are the internal motor torques.
- $J^T f_{\text{external}}$ represents external contact forces (e.g., foot-ground contact) mapped through the Jacobian.

Every visual bone is a rigid body with physical mass. Movements are achieved *exclusively* by applying motor torques $\tau_{\text{applied}}$, guaranteeing that all motion is continuous, smooth, and physically plausible.

### 2. Policy Outputs and Proportional-Derivative (PD) Control Loops
Instead of outputting raw joint positions that are directly copied to the skeleton, the machine learning (ML) policy in ProtoMotion outputs **target joint angles** $q^*$. These targets act as virtual set-points for high-frequency internal PD control loops.

The fundamental PD equation used to compute joint torque $\tau_i$ is:
$$\tau_i = K_p (q^*_i - q_i) - K_d \dot{q}_i$$
Where:
- $K_p$ is the proportional stiffness gain (restoring force proportional to angle error).
- $K_d$ is the derivative damping gain (damping force proportional to joint velocity, preventing oscillation).
- $q^*_i$ is the target joint angle commanded by the policy.
- $q_i$ is the current measured joint angle.
- $\dot{q}_i$ is the current joint velocity.

#### Contrast: PD Control vs. Linear/Spherical Interpolation (Lerp/Slerp)
The table below contrasts these two paradigms to explain why simple visual interpolation fails to achieve physical realism:

| Attribute | Visual Interpolation (Lerp/Slerp) | Proportional-Derivative (PD) Control |
| :--- | :--- | :--- |
| **Mathematical Formulation** | $q_t = \text{slerp}(q_0, q_1, t)$ | $\tau = K_p (q^* - q) - K_d \dot{q}$ |
| **Integrates Mass & Inertia** | No. Treats all limbs as massless points. | Yes. Acceleration depends on the joint-space mass matrix $M(q)$. |
| **Acceleration Continuity** | Discontinuous ($C^0$ continuity). High jerk. | Continuous ($C^1$ or $C^2$ continuity). Fluid, natural acceleration. |
| **Reaction to Contacts** | None. Feet clip through geometry or slide. | Real-time reaction. External forces deflect joints naturally. |
| **Energy Conservation** | None. Limbs can generate infinite energy. | Strictly conserved. Energy dissipated via joint damping ($K_d$). |

### 3. Preventing the "Violent Angle Overwrite" Bug in Synthia
The primary bug in Synthia—where characters shake violently or fly apart when applying AI targets—is caused by **overwriting raw angles (kinematic snapping) in the middle of physics steps**. Overwriting raw coordinates causes the physics solver to detect infinite velocities, resulting in explosive contact forces.

To resolve this in Synthia:
1. **Never write to `.translation()` or `.rotation()` of active colliders during gameplay.**
2. Set the Rapier3D rigid body to `Dynamic`.
3. Set up a `RevoluteImpulseJoint` and use `joint.configureMotorPosition(targetAngle, Kp, Kd)`. This lets Rapier's constraint solver solve the PD equation implicitly inside the LCP (Linear Complementarity Problem) solver loop, producing smooth, organic motion.

---

## Module 2: Complete Rig Constraints & Finger Mapping

### 1. Exhaustive Humanoid Joint Constraints Mapping
To prevent self-collision, joint hyperextensions, and unnatural limb twisting, you must configure joint limits on every degree of freedom (DoF). Joints are categorized by their rotational capabilities:
- **1-DoF Hinge Joints**: Elbows, knees. (Pitch only).
- **2-DoF Cardan/Universal Joints**: Wrists, ankles. (Pitch + Roll/Yaw).
- **3-DoF Ball-and-Socket Joints**: Hips, shoulders, neck, waist. (Pitch + Roll + Yaw).

*Note: In the mapping below, Pitch represents rotation about the local X-axis (Flexion/Extension), Roll represents rotation about the local Y-axis (Twist/Pronation), and Yaw represents rotation about the local Z-axis (Abduction/Adduction).*

#### Table: Complete Joint-by-Joint Constraints Map

| Joint ID | Description | DoF | Axes | Radian Range | Degree Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Waist** | Pelvis-to-Spine link | 3 | Pitch, Roll, Yaw | P: $[-0.35, 0.78]$<br>R: $[-0.44, 0.44]$<br>Y: $[-0.52, 0.52]$ | P: $[-20^{\circ}, 45^{\circ}]$<br>R: $[-25^{\circ}, 25^{\circ}]$<br>Y: $[-30^{\circ}, 30^{\circ}]$ |
| **Spine** | Upper Torso link | 3 | Pitch, Roll, Yaw | P: $[-0.26, 0.52]$<br>R: $[-0.35, 0.35]$<br>Y: $[-0.35, 0.35]$ | P: $[-15^{\circ}, 30^{\circ}]$<br>R: $[-20^{\circ}, 20^{\circ}]$<br>Y: $[-20^{\circ}, 20^{\circ}]$ |
| **Neck** | Neck rotation | 3 | Pitch, Roll, Yaw | P: $[-0.52, 0.52]$<br>R: $[-0.35, 0.35]$<br>Y: $[-0.78, 0.78]$ | P: $[-30^{\circ}, 30^{\circ}]$<br>R: $[-20^{\circ}, 20^{\circ}]$<br>Y: $[-45^{\circ}, 45^{\circ}]$ |
| **Head** | Head tilting | 2 | Pitch, Roll | P: $[-0.26, 0.26]$<br>R: $[-0.26, 0.26]$ | P: $[-15^{\circ}, 15^{\circ}]$<br>R: $[-15^{\circ}, 15^{\circ}]$ |
| **L/R Shoulder**| Shoulder socket | 3 | Pitch, Roll, Yaw | P: $[-1.57, 1.57]$<br>R: $[-1.57, 0.52]$<br>Y: $[-1.04, 1.04]$ | P: $[-90^{\circ}, 90^{\circ}]$<br>R: $[-90^{\circ}, 30^{\circ}]$<br>Y: $[-60^{\circ}, 60^{\circ}]$ |
| **L/R Elbow** | Elbow flexion | 1 | Pitch (only) | P: $[0.00, 2.35]$ | P: $[0^{\circ}, 135^{\circ}]$ |
| **L/R Wrist** | Wrist flex/abduction | 2 | Pitch, Yaw | P: $[-0.78, 0.78]$<br>Y: $[-0.52, 0.52]$ | P: $[-45^{\circ}, 45^{\circ}]$<br>Y: $[-30^{\circ}, 30^{\circ}]$ |
| **L/R Hip** | Hip socket | 3 | Pitch, Roll, Yaw | P: $[-0.78, 1.57]$<br>R: $[-0.52, 0.78]$<br>Y: $[-0.52, 0.52]$ | P: $[-45^{\circ}, 90^{\circ}]$<br>R: $[-30^{\circ}, 45^{\circ}]$<br>Y: $[-30^{\circ}, 30^{\circ}]$ |
| **L/R Knee** | Knee flexion | 1 | Pitch (only) | P: $[-2.35, 0.00]$ | P: $[-135^{\circ}, 0^{\circ}]$ |
| **L/R Ankle** | Foot tilt and flex | 2 | Pitch, Roll | P: $[-0.52, 0.52]$<br>R: $[-0.35, 0.35]$ | P: $[-30^{\circ}, 30^{\circ}]$<br>R: $[-20^{\circ}, 20^{\circ}]$ |

#### Finger Joints (Phalanges Map)
Fingers are critical for expressive humanoid motion and object interaction. Each of the 5 fingers (Thumb, Index, Middle, Ring, Pinky) has three joints:
- **CMC / MCP (Carpometacarpal / Metacarpophalangeal)**: 2-DoF (Pitch for Flexion, Yaw for Abduction).
- **PIP (Proximal Interphalangeal)**: 1-DoF (Pitch for Flexion).
- **DIP (Distal Interphalangeal)**: 1-DoF (Pitch for Flexion).

| Finger Joint | Type | Pitch Rad Range | Pitch Deg Range | Yaw Rad Range | Yaw Deg Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Thumb CMC** | 2-DoF | $[-0.26, 0.78]$ | $[-15^{\circ}, 45^{\circ}]$ | $[-0.52, 0.52]$ | $[-30^{\circ}, 30^{\circ}]$ |
| **Thumb MCP** | 1-DoF | $[0.00, 1.04]$ | $[0^{\circ}, 60^{\circ}]$ | N/A | N/A |
| **Thumb DIP** | 1-DoF | $[-0.17, 1.30]$ | $[-10^{\circ}, 75^{\circ}]$ | N/A | N/A |
| **Index MCP** | 2-DoF | $[-0.17, 1.57]$ | $[-10^{\circ}, 90^{\circ}]$ | $[-0.26, 0.26]$ | $[-15^{\circ}, 15^{\circ}]$ |
| **Index PIP** | 1-DoF | $[0.00, 1.74]$ | $[0^{\circ}, 100^{\circ}]$ | N/A | N/A |
| **Index DIP** | 1-DoF | $[0.00, 1.39]$ | $[0^{\circ}, 80^{\circ}]$ | N/A | N/A |
| **Middle MCP**| 2-DoF | $[-0.17, 1.57]$ | $[-10^{\circ}, 90^{\circ}]$ | $[-0.08, 0.08]$ | $[-5^{\circ}, 5^{\circ}]$ |
| **Middle PIP**| 1-DoF | $[0.00, 1.74]$ | $[0^{\circ}, 100^{\circ}]$ | N/A | N/A |
| **Middle DIP**| 1-DoF | $[0.00, 1.39]$ | $[0^{\circ}, 80^{\circ}]$ | N/A | N/A |
| **Ring MCP** | 2-DoF | $[-0.17, 1.57]$ | $[-10^{\circ}, 90^{\circ}]$ | $[-0.17, 0.17]$ | $[-10^{\circ}, 10^{\circ}]$ |
| **Ring PIP** | 1-DoF | $[0.00, 1.74]$ | $[0^{\circ}, 100^{\circ}]$ | N/A | N/A |
| **Ring DIP** | 1-DoF | $[0.00, 1.39]$ | $[0^{\circ}, 80^{\circ}]$ | N/A | N/A |
| **Pinky MCP** | 2-DoF | $[-0.17, 1.57]$ | $[-10^{\circ}, 90^{\circ}]$ | $[-0.35, 0.35]$ | $[-20^{\circ}, 20^{\circ}]$ |
| **Pinky PIP** | 1-DoF | $[0.00, 1.74]$ | $[0^{\circ}, 100^{\circ}]$ | N/A | N/A |
| **Pinky DIP** | 1-DoF | $[0.00, 1.39]$ | $[0^{\circ}, 80^{\circ}]$ | N/A | N/A |

---

### 2. Coordinate System Translation: Python (Z-Up) $\rightarrow$ Web (Y-Up)
Python simulators (MuJoCo, Isaac Gym, Isaac Lab) typically use a **Z-Up** coordinate system. Web libraries (Three.js, Rapier3D) use a **Y-Up** coordinate system.

```
       Python (Z-Up)                         Web (Y-Up)
            +Z (Up)                               +Y (Up)
             |   +Y (Forward)                      |   +Z (Forward)
             |  /                                  |  /
             | /                                   | /
             |/                                    |/
   -X -------+------- +X                 -X -------+------- +X
            /|                                    /|
           / |                                   / |
          /  -Z                                 /  -Y
        -Y                                    -Z
```

#### Mapping Equations
To translate physical positions, linear velocities, and forces from Z-Up to Y-Up, apply the mapping matrix:
$$R_{\text{Z-to-Y}} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & -1 & 0 \end{bmatrix}$$
This yields the mapping equations:
- $X_{\text{web}} = X_{\text{python}}$
- $Y_{\text{web}} = Z_{\text{python}}$
- $Z_{\text{web}} = -Y_{\text{python}}$

For quaternions, a Python quaternion $q_p = (x_p, y_p, z_p, w_p)$ translates to a Web quaternion $q_w = (x_w, y_w, z_w, w_w)$ by applying a $-90^{\circ}$ rotation about the X-axis:
$$q_{\text{web}} = q_{\text{python}} \otimes \text{Quaternion.fromAxisAngle}([1, 0, 0], -\pi/2)$$

#### Handling Mirrored Bone Axes for Left/Right Limbs
Humanoid rigs are symmetrical. To maintain mirror-symmetry when executing animations or applying identical policy control parameters, the local joint rotation coordinate frames for Left and Right limbs must account for inversion.
- **Rules**:
  - The local longitudinal axis (typically Y or Z, pointing down the limb) is mirrored.
  - In Three.js and Rapier3D, mirror joint angles along the sagital plane ($X = 0$) by inverting the **Roll** (Y-twist) and **Yaw** (Z-swing) target angles for the Right limbs, while keeping **Pitch** (X-flexion) identical:
    $$\theta_{\text{Right, local}} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & -1 \end{bmatrix} \theta_{\text{Left, local}}$$
  - This ensures that a positive swing target causes both the Left and Right arms to abduct outwards.

---

## Module 3: Procedural Primitive Character Generation

### 1. Sizing, Density, Mass, and Center of Gravity (CoG)
ProtoMotion avoids relying entirely on complex visual meshes for physics, as mesh colliders are computationally expensive and prone to solver instabilities (clipping, interpenetration). Instead, they construct the character procedurally using **primitive geometric shapes**:
- **Head**: Sphere.
- **Torso, Pelvis, Limbs**: Capsules (stable cylindrical sides, spherical ends that prevent friction catching).
- **Hands, Feet**: Boxes (provide stable, flat contact planes).

To ensure high stability and realistic movement, the mass properties are configured based on biometric anthropomorphic data:

```
            (Sphere)  Head  [Density: 1000 kg/m³, Weight: ~7% of total]
                       O
                       |
         (Capsule)  Torso   [Density: 1100 kg/m³, Weight: ~43% of total, Low CoG]
                    /  |  \
       (Capsule)   /   |   \  (Capsule)
         L-Arm    /    |    \   R-Arm
                 / (Capsule) \
                  | Pelvis  |
                   /       \
                  /         \
       (Capsule) /           \ (Capsule)
          L-Leg /             \  R-Leg
               /               \
             [Box]            [Box]
            L-Foot           R-Foot   [Density: 1200 kg/m³, Flat ground contact]
```

- **Mass Distribution**: The torso and pelvis are given high mass and a lower Center of Gravity (CoG) relative to their geometry, providing a stable "pendulum base". Limbs are lighter to limit swing inertia and reduce rotational load on joint motors.
- **Joint Anchors**: Anchor pivots must sit exactly at the center-line intersection of adjacent capsule ends, ensuring smooth, non-eccentric joint rotation.

---

### 2. Procedural Humanoid Rig Building Code Blueprint
The TypeScript code below demonstrates how to construct this procedural humanoid rig dynamically using Three.js and `@dimforge/rapier3d-compat`.

```typescript
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

export class ProceduralHumanoidBuilder {
  private scene: THREE.Scene;
  private world: RAPIER.World;
  private material: THREE.MeshStandardMaterial;

  constructor(scene: THREE.Scene, world: RAPIER.World) {
    this.scene = scene;
    this.world = world;
    this.material = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.5 });
  }

  /**
   * Dynamically constructs a procedural body part (Mesh + RigidBody + Collider).
   */
  public buildPart(
    name: string,
    shape: 'sphere' | 'capsule' | 'box',
    dims: { rx?: number; ry?: number; rz?: number; h?: number }, // dimensions
    position: THREE.Vector3,
    density: number
  ): { body: RAPIER.RigidBody; mesh: THREE.Mesh } {

    // 1. Create Three.js Visual Geometry
    let geometry: THREE.BufferGeometry;
    if (shape === 'sphere') {
      geometry = new THREE.SphereGeometry(dims.rx || 0.1, 16, 16);
    } else if (shape === 'capsule') {
      geometry = new THREE.CapsuleGeometry(dims.rx || 0.08, dims.h || 0.3, 8, 16);
    } else {
      geometry = new THREE.BoxGeometry(dims.rx || 0.1, dims.ry || 0.05, dims.rz || 0.2);
    }

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.copy(position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    // 2. Create Rapier3D Rigid Body
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(position.x, position.y, position.z);
    const body = this.world.createRigidBody(bodyDesc);

    // 3. Create Rapier3D Collider matching the geometry
    let colliderDesc: RAPIER.ColliderDesc;
    if (shape === 'sphere') {
      colliderDesc = RAPIER.ColliderDesc.ball(dims.rx || 0.1);
    } else if (shape === 'capsule') {
      colliderDesc = RAPIER.ColliderDesc.capsule((dims.h || 0.3) / 2, dims.rx || 0.08);
    } else {
      colliderDesc = RAPIER.ColliderDesc.cuboid((dims.rx || 0.1) / 2, (dims.ry || 0.05) / 2, (dims.rz || 0.2) / 2);
    }

    colliderDesc.setDensity(density);
    colliderDesc.setFriction(0.6);
    colliderDesc.setRestitution(0.1);
    this.world.createCollider(colliderDesc, body);

    return { body, mesh };
  }

  /**
   * Assembles a 3D physical character and connects limbs via joints.
   */
  public assembleCharacter(): Map<string, RAPIER.RigidBody> {
    const bodies = new Map<string, RAPIER.RigidBody>();

    // 1. Create Core Root Bodies
    const pelvis = this.buildPart('pelvis', 'capsule', { rx: 0.1, h: 0.15 }, new THREE.Vector3(0, 0.9, 0), 1050);
    const torso = this.buildPart('torso', 'capsule', { rx: 0.12, h: 0.35 }, new THREE.Vector3(0, 1.25, 0), 1100);
    bodies.set('pelvis', pelvis.body);
    bodies.set('torso', torso.body);

    // 2. Connect Torso and Pelvis via a Revolute Waist Joint
    const waistAnchorPelvis = new RAPIER.Vector3(0.0, 0.1, 0.0);
    const waistAnchorTorso = new RAPIER.Vector3(0.0, -0.2, 0.0);
    const waistAxis = new RAPIER.Vector3(1.0, 0.0, 0.0); // Pitch flexion

    const waistJointDesc = RAPIER.JointData.revolute(waistAnchorPelvis, waistAnchorTorso, waistAxis);
    // Configure rotation limit to prevent waist hyperextension [-20deg, 45deg]
    waistJointDesc.limitsEnabled = true;
    waistJointDesc.limits = [-0.35, 0.78];

    this.world.createJoint(waistJointDesc, pelvis.body, torso.body, true);

    // 3. Create Left Thigh & Connect to Pelvis
    const leftThigh = this.buildPart('left_thigh', 'capsule', { rx: 0.07, h: 0.35 }, new THREE.Vector3(-0.15, 0.65, 0), 1000);
    bodies.set('left_thigh', leftThigh.body);

    const hipAnchorPelvis = new RAPIER.Vector3(-0.15, -0.05, 0.0);
    const hipAnchorThigh = new RAPIER.Vector3(0.0, 0.18, 0.0);
    const hipJointDesc = RAPIER.JointData.revolute(hipAnchorPelvis, hipAnchorThigh, new RAPIER.Vector3(1, 0, 0));
    hipJointDesc.limitsEnabled = true;
    hipJointDesc.limits = [-0.78, 1.57]; // Hip Pitch range

    this.world.createJoint(hipJointDesc, pelvis.body, leftThigh.body, true);

    return bodies;
  }
}
```

---

## Module 4: Smooth Locomotion & Gait Simulation

### 1. Gait Cycle Mechanics, Foot Contacts, and Active Balance
Simulating a smooth, stable walk cycle requires solving three continuous physical challenges in real-time:

```
                  Active Root Torque (Virtual Springs)
                   /===>  \tau = -Kp*(\theta) - Kd*(\omega)
                  /
                [Root] (Torso)
                /    \
               /      \
      Swing Leg       Stance Leg (Supporting Weight)
             /          \
            /            \   Contact Force (f_n)
          [Foot]        [Foot] ======= Ground
         (In Air)          |
                         Friction (f_t = \mu * f_n)
```

#### Active Root Stabilization
Humanoids are non-holonomic, underactuated systems; they cannot apply torque directly between the pelvis and the world coordinate system. Active balancing is achieved by simulating a virtual rotary spring between the pelvis and the desired heading axis:
$$\tau_{\text{stabilization}} = -K_{p,\text{root}} (\theta_{\text{pelvis}} - \theta_{\text{desired}}) - K_{d,\text{root}} \omega_{\text{pelvis}}$$
This corrective stabilization torque is distributed and applied as equal and opposite reaction forces across the stance leg joints (the leg in contact with the ground).

#### Evaluating Foot-Ground Contacts
Stable gaits require tracking foot contact states. During walking, the leg transitions between:
1. **Swing Phase**: Low contact force ($f_n \approx 0$). Joint positions follow target trajectory animations.
2. **Stance Phase**: High contact force ($f_n \ge \text{Body Weight}$). Joint control modes switch to support weight, matching friction forces to prevent slip:
   $$f_t \le \mu f_n$$

If the stance foot slips, the active balance torque cannot project reaction forces, causing the character to fall.

---

### 2. Production-Ready Web Implementation Architecture

Implementing this system on the web requires working within the architectural limits of browser rendering threads. Because physics calculations are computationally heavy, you should offload the Rapier3D simulation to a **Web Worker**.

To prevent input lag and visual stutter, use a **Decoupled Main-Worker State Bridge** with **Hermite Spline Interpolation**.

```
    [ MAIN THREAD (60-120fps) ]                [ WEB WORKER (60Hz Fixed) ]
  +---------------------------+              +-----------------------------+
  |  requestAnimationFrame    |              |  Rapier3D World             |
  |  Interpolate State        |              |  Solve Contacts             |
  |  Render (Three.js)        |<--[Buffer]---|  Apply Joint Torques        |
  |  Read User Inputs         |--[Inputs]--->|  Step Physics (60Hz)        |
  +---------------------------+              +-----------------------------+
```

#### Step-by-Step Implementation Blueprint

1. **Offload Physics to a Web Worker**:
   Initialize `@dimforge/rapier3d-compat` inside a Web Worker. Step the simulation at a fixed frequency ($60\text{ Hz}$ or $\Delta t = 16.67\text{ ms}$) rather than using variable frames.

2. **Decouple Physics and Rendering States**:
   Send visual transform updates from the worker thread to the main thread using an `ArrayBuffer` (passed as a **SharedArrayBuffer** or a **Transferable Object** to eliminate copying overhead):
   ```typescript
   // Message layout in the ArrayBuffer
   // [ root_x, root_y, root_z, root_qw, root_qx, root_qy, root_qz, joint_0, joint_1, ... ]
   ```

3. **Smooth Transform Interpolation**:
   Because rendering on the main thread can exceed $60\text{ fps}$ (e.g., on $120\text{ Hz}$ displays) and Web Worker messages can suffer from jitter, the main thread should interpolate between the two most recently received physics states.
   - Use **Linear Interpolation (LERP)** for positions and **Spherical Linear Interpolation (SLERP)** for orientations:
     $$x_{\text{render}} = \text{lerp}(x_{t-1}, x_t, \alpha)$$
     $$q_{\text{render}} = \text{slerp}(q_{t-1}, q_t, \alpha)$$
     where $\alpha$ is the fractional time elapsed between physics ticks on the main thread.

4. **Tune Solver Iterations and Joint Damping**:
   - Set the Rapier3D world solver iterations to at least `numSolverIterations = 8` (default is 4) to ensure that heavy torso links do not compress joint constraints.
   - Configure joint motors with high damping ($K_d$) on the ankle, knee, and hip Pitch axes to absorb impact shocks when feet strike the ground.
   - Introduce an **Acceleration Clamp** on the policy outputs to limit command chatter and prevent high-frequency joint oscillation.

---

### 3. Locomotion Controller Script Blueprint
The TypeScript class below implements this active stabilization loop, checking foot contacts and applying corrective balance torques.

```typescript
import RAPIER from '@dimforge/rapier3d-compat';
import * as THREE from 'three';

export class SmoothLocomotionController {
  private pelvis: RAPIER.RigidBody;
  private leftFoot: RAPIER.RigidBody;
  private rightFoot: RAPIER.RigidBody;

  // Active balance gains
  private KpBalance: number = 180.0;
  private KdBalance: number = 30.0;

  constructor(pelvis: RAPIER.RigidBody, leftFoot: RAPIER.RigidBody, rightFoot: RAPIER.RigidBody) {
    this.pelvis = pelvis;
    this.leftFoot = leftFoot;
    this.rightFoot = rightFoot;
  }

  /**
   * Tracks active foot contacts using Rapier's contact force buffers.
   */
  public evaluateFootContact(world: RAPIER.World, foot: RAPIER.RigidBody): boolean {
    let contactForceMagnitude = 0.0;

    // Iterate through contact pairs in the simulation world
    world.contactsWith(foot, (otherCollider, contactManifold, solve) => {
      // Aggregate normal impulses applied during contact solving
      for (let i = 0; i < contactManifold.nbPoints(); i++) {
        const point = contactManifold.point(i);
        // Multiplying impulse by frequency yields estimated normal force (Newtons)
        contactForceMagnitude += solve ? contactManifold.normalImpulse(i) * 60 : 0;
      }
    });

    // Threshold of 5.0 Newtons detects stable ground contact
    return contactForceMagnitude > 5.0;
  }

  /**
   * Calculates and applies balancing torques to keep the root standing upright.
   */
  public stepStabilization(world: RAPIER.World): void {
    const rot = this.pelvis.rotation();
    const angvel = this.pelvis.angvel();

    // 1. Represent pelvis orientation as a Three.js Euler structure
    const quat = new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w);
    const euler = new THREE.Euler().setFromQuaternion(quat, 'YXZ');

    // 2. Measure deviation from upright stance (desired Pitch/Roll = 0)
    const pitchError = 0.0 - euler.x;
    const rollError = 0.0 - euler.z;

    // 3. Apply active corrective torques
    const torqueX = this.KpBalance * pitchError - this.KdBalance * angvel.x;
    const torqueZ = this.KpBalance * rollError - this.KdBalance * angvel.z;

    // 4. Distribute the stabilization torque to the pelvis rigid body
    const isLeftContact = this.evaluateFootContact(world, this.leftFoot);
    const isRightContact = this.evaluateFootContact(world, this.rightFoot);

    if (isLeftContact || isRightContact) {
      // Stance phase: Apply stabilizing force to root
      this.pelvis.addTorque({ x: torqueX, y: 0.0, z: torqueZ }, true);
    } else {
      // Swing phase (aerial): Reduce correction gains to prevent erratic flailing
      this.pelvis.addTorque({ x: torqueX * 0.1, y: 0.0, z: torqueZ * 0.1 }, true);
    }
  }
}
```
