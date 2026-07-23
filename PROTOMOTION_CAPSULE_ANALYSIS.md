# ProtoMotion Humanoid Root Capsule Structure Analysis

This report documents a thorough technical audit of the ProtoMotion codebase, humanoid model templates (MJCF/XML), and simulator configurations to determine if ProtoMotion utilizes a central or root capsule body/geometry for its humanoid models.

---

## 1. Executive Summary & Affirmation

Following a comprehensive audit of all MJCF templates, robot configuration python classes, physics simulators, and controller setups in the ProtoMotion codebase:

**Affirmation:** ProtoMotion **does not** utilize a central, root, or torso-enclosing capsule primitive as the base body/geometry of its humanoid models.

Instead of a single enclosing capsule (which is sometimes used in simplified gaming models or character physics controllers to slide over terrain), ProtoMotion represents the humanoid root/torso/base using **direct articulated rigid bodies** with highly precise localized primitives:
1. **Sphere Primitives:** Used for pelvic collisions in AMP/Soma/G1 templates.
2. **Box Primitives:** Used for pelvic collisions in the SMPL template.
3. **No Auxiliary Root Shapes:** The physical floating base (root) is articulated directly with a 6-DOF free joint, with no auxiliary single-capsule shells wrapping the entire base model.

However, ProtoMotion **does utilize capsule primitives extensively for intermediate skeleton links** (e.g., thighs, shins, upper/lower arms, neck, and chest segments) and provides config options (e.g., `replace_cylinder_with_capsule`) to convert cylinders to capsules during asset loading.

---

## 2. Detailed Technical Breakdown of Humanoid Roots

The root body represents the kinematic base of the humanoid skeleton containing the 6-DOF free joint. Below is the exact layout of the root collision geoms across the primary humanoid templates in ProtoMotion:

### 2.1 AMP Humanoid (`amp_humanoid.xml`)
* **Root Body Name:** `pelvis`
* **Free Joint Definition:**
  ```xml
  <joint type="free" name="root" limited="false" actuatorfrclimited="false" />
  ```
* **Root Collision Geometry:** Uses two separate **spheres** instead of a capsule:
  ```xml
  <geom name="pelvis" type="sphere" pos="0 0 0.07" size=".09" density="2226" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
  <geom name="upper_waist" type="sphere" pos="0 0 0.205" size="0.07" density="2226" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
  ```

### 2.2 SOMA23 Humanoid (`soma23_humanoid.xml`)
* **Root Body Name:** `Hips`
* **Free Joint Definition:**
  ```xml
  <freejoint name='Hips'/>
  ```
* **Root Collision Geometry:** Uses a single **sphere** primitive:
  ```xml
  <geom type='sphere' size='0.08' pos='0 -0.03 0.00' density='1000' material='geom'/>
  ```

### 2.3 Unitree G1 Humanoid (`g1_holo_compat.xml`)
* **Root Body Name:** `pelvis`
* **Free Joint Definition:**
  ```xml
  <joint type="free" name="floating_base_joint" limited="false" actuatorfrclimited="false" />
  ```
* **Root Collision Geometry:** Uses visual meshes, but represents physical collisions via a **sphere**:
  ```xml
  <geom name="pelvis_collision" type="sphere" size="0.07" pos="0 0 -0.08" contype="1" conaffinity="1" group="3" rgba=".2 .6 .2 .3" />
  ```

### 2.4 SMPL Humanoid (`smpl_humanoid.xml`)
* **Root Body Name:** `Pelvis`
* **Free Joint Definition:**
  ```xml
  <joint type="free" name="Pelvis" limited="false" actuatorfrclimited="false" />
  ```
* **Root Collision Geometry:** Uses a **box** primitive:
  ```xml
  <geom type="box" pos="-0.0055 -0.0000 -0.0121" size="0.083 0.1069 0.0722" quat="1.0000 0.0000 0.0000 0.0000" density="1000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
  ```

---

## 3. Capsule Primitives in Intermediate Links

While the root body is never represented by a single capsule, ProtoMotion uses capsule geoms extensively throughout the rest of the humanoid body trees for intermediate link collisions:

* **Lower Extremities (Legs):** Thighs and shins are modeled as capsules in almost all templates. For example:
  * In `amp_humanoid.xml`:
    ```xml
    <geom name="right_thigh" fromto="0 0 -0.06 0 0 -0.36" size="0.055" density="1269" type="capsule" ... />
    <geom name="right_shin" fromto="0 0 -0.045 0 0 -0.355" size=".05" density="1014" type="capsule" ... />
    ```
* **Upper Extremities (Arms):** Upper arms and lower arms are modeled as capsules in G1, SOMA, and SMPL.
* **Trunk/Chest Segment:** The torso and chest bodies in `smpl_humanoid.xml` use capsules:
  ```xml
  <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="0.0005 0.0025 0.0608 0.0006 0.0030 0.0743" size="0.0769" ... />
  ```

---

## 4. Codebase & Python References Reviewed

To double-check if any configuration or dynamic pipeline implicitly defines or treats the humanoid root as a capsule, the following locations were audited:

### 4.1 Robot Configuration importing (`replace_cylinder_with_capsule`)
In `protomotions/robot_configs/base.py`'s `RobotAssetConfig` class, we find:
```python
replace_cylinder_with_capsule: Optional[bool] = None
```
This is utilized by specific humanoid configs such as **G1** (`g1.py`) and **H1** (`h1_2.py`):
```python
asset: RobotAssetConfig = field(
    default_factory=lambda: RobotAssetConfig(
        asset_file_name="mjcf/g1_holo_compat.xml",
        replace_cylinder_with_capsule=True,
        ...
    )
)
```
*Purpose:* When importing rigid bodies from standard USD or URDF files (which may define joints/links using cylinder geoms), the simulator converts cylinder shapes to capsule shapes. Capsules are mathematically better-conditioned in contact dynamics solvers (avoiding edge-contact singularities common with flat cylinder faces), preventing numerical explosion on contact.

### 4.2 Controller Logic Auditing
Grepping for `capsule` across all Python simulator wrappers (`mujoco/simulator.py`, `newton/simulator.py`, `genesis/simulator.py`, `isaacgym/simulator.py`) and observation builders reveals **no** references to any "root capsule" or auxiliary capsule torque controllers.

The simulators treat the root base simply as a `free` joint that moves with full 6 degrees of freedom under physical multibody dynamics. Height metrics, velocity tracking, and balance rewards (e.g., in observation modules and terminations) query the center of mass or position of the root body coordinates directly from forward kinematics, completely independent of geometric primitive types.

---

## 5. Conclusion

ProtoMotion relies on a **fully articulated, high-fidelity rigid body representation** for its humanoids.

Rather than simplifying the entire character base or torso into a single root capsule slider (common in kinematic character controllers), ProtoMotion keeps the pelvis body small (using tight spheres or boxes) and allows the multi-link legs (modeled with capsules) to interact directly with the ground. This ensures realistic contact force feedback, enabling the policy to learn complex, physically accurate motor behaviors such as heel-to-toe rolling, crouching, and balancing.
