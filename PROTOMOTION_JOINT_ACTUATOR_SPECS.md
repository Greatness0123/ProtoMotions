# ProtoMotion Joint & Actuator Specifications (`amp_humanoid.xml`)

This specification sheet provides a detailed technical breakdown of the mass distribution, joint dynamics, actuator configurations, joint ranges, armatures, and friction parameters of the standard humanoid mannequin model (`amp_humanoid.xml`) in ProtoMotion.

These values and configuration rules are critical to building a stable, non-jittering humanoid mannequin rig under gravity.

---

## 1. Mass Distribution

In MuJoCo, rigid body mass is typically not set directly as an attribute. Instead, it is computed dynamically by the simulator based on geom **shape size** (dimensions) and **density** ($\text{kg/m}^3$) using the standard physical equation:

$$\text{Mass} = \text{Volume} \times \text{Density}$$

### Volume Calculations by Primitive Type:
* **Sphere of radius $R$:**
  $$V = \frac{4}{3} \pi R^3$$
* **Capsule of radius $r$ and cylinder length $L$ (distance between `fromto` points):**
  $$V = \pi r^2 L + \frac{4}{3} \pi r^3$$
* **Box of half-dimensions $(s_x, s_y, s_z)$:**
  $$V = 8 s_x s_y s_z$$

### 1.1 Detailed Body Mass Table (Mannequin Rig)

Below is the exact physical layout of the $44$-kg ProtoMotion mannequin skeleton defined in `amp_humanoid.xml`:

| Body Segment | Geom Primitive(s) | Geom Size (m) | Density ($\text{kg/m}^3$) | Calculated Segment Mass (kg) | Total Body Mass (kg) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pelvis** | `pelvis` (sphere)<br>`upper_waist` (sphere) | $R = 0.09$<br>$R = 0.07$ | $2226$<br>$2226$ | $6.797$<br>$3.198$ | **$9.995$ kg** |
| **Torso** | `torso` (sphere)<br>`right_clavicle` (capsule)<br>`left_clavicle` (capsule) | $R = 0.11$<br>$r = 0.045, L \approx 0.084$<br>$r = 0.045, L \approx 0.084$ | $1794$<br>$1100$<br>$1100$ | $10.000$<br>$1.000$<br>$1.000$ | **$12.000$ kg** |
| **Head** | `head` (sphere)<br>`neck` (sphere) | $R = 0.095$<br>$R = 0.050$ | $1081$<br>$1081$ | $3.882$<br>$0.566$ | **$4.448$ kg** |
| **Upper Arms (x2)** | `upper_arm` (capsule) | $r = 0.045, L = 0.180$ | $982$ | $1.500$ each | **$3.000$ kg** (both) |
| **Lower Arms (x2)** | `lower_arm` (capsule) | $r = 0.040, L = 0.135$ | $1056$ | $1.000$ each | **$2.000$ kg** (both) |
| **Hands (x2)** | `hand` (sphere) | $R = 0.040$ | $1865$ | $0.500$ each | **$1.000$ kg** (both) |
| **Thighs (x2)** | `thigh` (capsule) | $r = 0.055, L = 0.300$ | $1269$ | $4.500$ each | **$9.000$ kg** (both) |
| **Shins (x2)** | `shin` (capsule) | $r = 0.050, L = 0.310$ | $1014$ | $3.000$ each | **$6.000$ kg** (both) |
| **Feet (x2)** | `foot` (box) | $s_x=0.0885, s_y=0.045, s_z=0.0275$ | $1141$ | $1.000$ each | **$2.000$ kg** (both) |
| **Total Rig Mass** | — | — | — | — | **$\approx 44.44$ kg** |

*Note: Left and right limbs are fully symmetric.*

---

## 2. Joint Dynamics & Actuators

### 2.1 Actuator XML Definitions
In `amp_humanoid.xml`, joint actuators are defined using standard `<motor>` tags with a symmetric torque scaling multiplier (`gear`):

```xml
<actuator>
  <motor name="right_hip_x" gear="200" joint="right_hip_x" />
  <motor name="right_knee_x" gear="150" joint="right_knee_x" />
  <motor name="right_ankle_x" gear="90" joint="right_ankle_x" />
  <!-- ... repeat for other dimensions and limbs ... -->
</actuator>
```

### 2.2 Active PD gains & Torque Limits for Leg Joints

In `ControlType.BUILT_IN_PD`, ProtoMotion's simulator dynamically overrides these motors to run implicit position control at the physics solver level.
The parser (`extract_control_info` inside `protomotions/components/pose_lib.py`) extracts the joint stiffness ($K_p$) and damping ($K_d$) parameters directly from the joint definitions in the XML.

If not explicitly defined in the XML, the effort/torque limits ($T_{max}$) default to `1000.0` in the controller setup, but are capped inside the simulator's control loops based on the actuator's input range and `gear` parameter.

#### Leg Actuator/Control Specifications:
* **Hips (`_hip_x`, `_hip_y`, `_hip_z`):**
  * **PD Stiffness ($K_p$):** $500.0$ N·m/rad
  * **PD Damping ($K_d$):** $50.0$ N·m·s/rad
  * **Torque/Effort Limit ($T_{max}$):** $\pm 200.0$ N·m (scaled via `gear="200"`)
* **Knees (`_knee_x`, `_knee_y`, `_knee_z`):**
  * **PD Stiffness ($K_p$):** $500.0$ N·m/rad
  * **PD Damping ($K_d$):** $50.0$ N·m·s/rad
  * **Torque/Effort Limit ($T_{max}$):** $\pm 150.0$ N·m (scaled via `gear="150"`)
* **Ankles (`_ankle_x`, `_ankle_y`, `_ankle_z`):**
  * **PD Stiffness ($K_p$):** $400.0$ N·m/rad
  * **PD Damping ($K_d$):** $40.0$ N·m·s/rad
  * **Torque/Effort Limit ($T_{max}$):** $\pm 90.0$ N·m (scaled via `gear="90"`)

### 2.3 The `_zero_passive_forces` Mandate
To prevent joint stiffness and damping from being **double-counted**, the simulator explicitly clears the joint-level stiffness and damping arrays defined in the XML at loading time:
```python
# Clear passive forces so only the active PD loops control stiffness/damping
self.model.jnt_stiffness[:] = 0.0
self.model.dof_damping[:] = 0.0
```

---

## 3. Joint Limits & Friction Parameters (Legs)

Lower body joints are equipped with rotational limits (`range` in degrees), rotor armatures, and friction losses to prevent wild leg swings and stabilize standing contacts.

| Leg Joint | Axis of Rotation | Range (Degrees) | Joint Armature | Joint Friction (`frictionloss`) |
| :--- | :--- | :--- | :--- | :--- |
| **right_hip_x** | $[1, 0, 0]$ (Abduction/Adduction) | $[-60^{\circ}, 15^{\circ}]$ | `0.02` | `0.1` |
| **right_hip_y** | $[0, 1, 0]$ (Flexion/Extension) | $[-140^{\circ}, 60^{\circ}]$ | `0.02` | `0.1` |
| **right_hip_z** | $[0, 0, 1]$ (Internal/External Rot) | $[-60^{\circ}, 35^{\circ}]$ | `0.02` | `0.1` |
| **right_knee_x** | $[1, 0, 0]$ (Anterior/Posterior bend)| $[-30^{\circ}, 30^{\circ}]$ | `0.02` | `0.1` |
| **right_knee_y** | $[0, 1, 0]$ (Knee Flexion) | $[0^{\circ}, 160^{\circ}]$ | `0.02` | `0.1` |
| **right_knee_z** | $[0, 0, 1]$ (Knee rotation) | $[-30^{\circ}, 30^{\circ}]$ | `0.02` | `0.1` |
| **right_ankle_x** | $[1, 0, 0]$ (Ankle inversion) | $[-30^{\circ}, 30^{\circ}]$ | `0.01` | `0.1` |
| **right_ankle_y**| $[0, 1, 0]$ (Plantar/Dorsiflexion) | $[-55^{\circ}, 55^{\circ}]$ | `0.01` | `0.1` |
| **right_ankle_z**| $[0, 0, 1]$ (Ankle twist) | $[-40^{\circ}, 40^{\circ}]$ | `0.01` | `0.1` |

*Symmetry: Left leg joints share the same parameters, with joint ranges mirrored for anatomical consistency (e.g., `left_hip_x` range is $[-15^{\circ}, 60^{\circ}]$ and `left_hip_z` is $[-35^{\circ}, 60^{\circ}]$).*

### 3.1 Coulomb Friction Loss Stabilization
While passive damping and stiffness are zeroed out in step 2.3, joint-level **Coulomb friction loss** (`frictionloss="0.1"`) is **preserved** and remains fully active in the MuJoCo physics engine. This friction loss introduces a non-linear threshold force that prevents small, parasitic forces (such as slight gravity torque imbalance) from causing the mannequin to slowly "drift" or jitter when standing in place.
