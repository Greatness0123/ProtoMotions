# SPDX-FileCopyrightText: Copyright (c) 2025-2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
# SPDX-License-Identifier: Apache-2.0

import xml.etree.ElementTree as ET
import math
import sys
import os

def parse_vector(val_str):
    if val_str is None:
        return [0.0, 0.0, 0.0]
    try:
        return [float(x) for x in val_str.split()]
    except Exception:
        return [0.0, 0.0, 0.0]

def compute_geom_mass(geom):
    geom_type = geom.get('type', 'sphere')
    density = float(geom.get('density', '1000')) # Default MuJoCo density is 1000
    mass_attr = geom.get('mass')
    if mass_attr is not None:
        return float(mass_attr)

    size_str = geom.get('size')
    if size_str is None:
        return 0.0
    sizes = [float(x) for x in size_str.split()]

    if geom_type == 'box':
        if len(sizes) >= 3:
            vol = 8.0 * sizes[0] * sizes[1] * sizes[2]
            return vol * density
        elif len(sizes) == 1:
            vol = sizes[0] ** 3
            return vol * density
    elif geom_type == 'capsule':
        fromto_str = geom.get('fromto')
        if fromto_str is not None:
            pts = [float(x) for x in fromto_str.split()]
            if len(pts) >= 6:
                r = sizes[0] if len(sizes) > 0 else 0.0
                L = math.sqrt((pts[3]-pts[0])**2 + (pts[4]-pts[1])**2 + (pts[5]-pts[2])**2)
                vol = math.pi * (r**2) * L + (4.0/3.0) * math.pi * (r**3)
                return vol * density
        else:
            if len(sizes) >= 2:
                r = sizes[0]
                h = sizes[1]
                L = 2.0 * h
                vol = math.pi * (r**2) * L + (4.0/3.0) * math.pi * (r**3)
                return vol * density
            elif len(sizes) == 1:
                r = sizes[0]
                vol = (4.0/3.0) * math.pi * (r**3)
                return vol * density
    elif geom_type == 'sphere':
        if len(sizes) >= 1:
            r = sizes[0]
            vol = (4.0/3.0) * math.pi * (r**3)
            return vol * density
    elif geom_type == 'cylinder':
        if len(sizes) >= 2:
            r = sizes[0]
            h = sizes[1]
            vol = math.pi * (r**2) * (2.0 * h)
            return vol * density
    return 0.0

def parse_mjcf(filepath):
    print(f"Parsing {filepath}...", file=sys.stderr)
    tree = ET.parse(filepath)
    root = tree.getroot()

    # 1. Joint Definitions
    joints = []
    # 2. Body definitions
    bodies = []
    # 3. Actuator definitions
    actuators = []

    # We will traverse worldbody recursively to keep track of parents
    worldbody = root.find('worldbody')

    def traverse(body_elem, parent_name):
        body_name = body_elem.get('name')
        if body_name is None:
            return

        pos_str = body_elem.get('pos', '0 0 0')
        pos = [float(x) for x in pos_str.split()]

        # Calculate total mass of geoms in this body
        total_mass = 0.0
        geom_infos = []
        for geom in body_elem.findall('geom'):
            g_type = geom.get('type', 'sphere')
            g_size = geom.get('size', 'N/A')
            g_mass = compute_geom_mass(geom)
            total_mass += g_mass
            geom_infos.append((g_type, g_size, g_mass))

        # Inertial block (if present)
        inertial = body_elem.find('inertial')
        if inertial is not None:
            inertial_mass = inertial.get('mass')
            if inertial_mass is not None:
                total_mass = float(inertial_mass)
            diaginertia = inertial.get('diaginertia', 'N/A')
        else:
            diaginertia = 'N/A (Auto-computed)'

        # If there are no geoms but inertial mass is specified
        if not geom_infos:
            geom_infos.append(('None', 'N/A', total_mass))

        bodies.append({
            'name': body_name,
            'parent': parent_name,
            'pos': pos,
            'mass': total_mass,
            'diaginertia': diaginertia,
            'geoms': geom_infos
        })

        # Parse joints in this body
        for joint in body_elem.findall('joint'):
            j_name = joint.get('name', 'unnamed')
            j_type = joint.get('type', 'hinge')
            j_range = joint.get('range', 'N/A')
            j_axis = joint.get('axis', 'N/A')
            j_armature = joint.get('armature', '0')
            j_damping = joint.get('damping', '0')
            j_stiffness = joint.get('stiffness', '0')

            # Check if limited is True/False or default
            joints.append({
                'name': j_name,
                'type': j_type,
                'range': j_range,
                'axis': j_axis,
                'armature': j_armature,
                'damping': j_damping,
                'stiffness': j_stiffness,
                'body': body_name
            })

        # Recursive traverse
        for child in body_elem.findall('body'):
            traverse(child, body_name)

    if worldbody is not None:
        for root_body in worldbody.findall('body'):
            traverse(root_body, 'worldbody')

    # Actuators
    actuator_section = root.find('actuator')
    if actuator_section is not None:
        for motor in list(actuator_section):
            act_name = motor.get('name', 'unnamed')
            joint_controlled = motor.get('joint', 'N/A')
            gear = motor.get('gear', '1')
            ctrlrange = motor.get('ctrlrange', 'N/A')
            forcelimit = motor.get('forcelimit', 'N/A')

            actuators.append({
                'name': act_name,
                'joint': joint_controlled,
                'gear': gear,
                'ctrlrange': ctrlrange,
                'forcelimit': forcelimit
            })

    return joints, bodies, actuators

def format_markdown(joints, bodies, actuators, filename):
    out = []
    out.append(f"### Model File: `{filename}`")
    out.append("")

    # Joints
    out.append("#### 1a. Joint Definitions")
    out.append("| Joint Name | Type | Range (degrees) | Axis (x y z) | Armature | Damping | Stiffness | Parent Body |")
    out.append("| --- | --- | --- | --- | --- | --- | --- | --- |")
    for j in joints:
        out.append(f"| {j['name']} | {j['type']} | {j['range']} | {j['axis']} | {j['armature']} | {j['damping']} | {j['stiffness']} | {j['body']} |")
    out.append("")

    # Bodies
    out.append("#### 1b. Body (Bone) Definitions")
    out.append("| Body Name | Parent Body | Position Offset (x y z) | Total Mass (kg) | Inertia Diagonal | Geoms (Type, Size, Mass) |")
    out.append("| --- | --- | --- | --- | --- | --- |")
    for b in bodies:
        geoms_str = ", ".join([f"{g[0]} (size={g[1]}, mass={g[2]:.5f}kg)" for g in b['geoms']])
        pos_str = f"({b['pos'][0]:.4f}, {b['pos'][1]:.4f}, {b['pos'][2]:.4f})"
        out.append(f"| {b['name']} | {b['parent']} | {pos_str} | {b['mass']:.5f} | {b['diaginertia']} | {geoms_str} |")
    out.append("")

    # Actuators
    out.append("#### 1c. Actuator Definitions")
    if actuators:
        out.append("| Actuator Name | Joint Controlled | Gear Ratio / Scale | Ctrl Range | Force Limit |")
        out.append("| --- | --- | --- | --- | --- |")
        for a in actuators:
            out.append(f"| {a['name']} | {a['joint']} | {a['gear']} | {a['ctrlrange']} | {a['forcelimit']} |")
    else:
        out.append("*No actuator tags found in this model file (control is done via custom simulator mechanisms or internal PD).*")
    out.append("")

    return "\n".join(out)

if __name__ == "__main__":
    import json
    # Run the parsing for the three selected files
    files = [
        "protomotions/data/assets/mjcf/smpl_humanoid.xml",
        "protomotions/data/assets/mjcf/amp_humanoid.xml",
        "protomotions/data/assets/mjcf/smplx_humanoid.xml"
    ]

    for f in files:
        if os.path.exists(f):
            joints, bodies, actuators = parse_mjcf(f)
            # Print a quick summary of parsed elements to verify
            print(f"File: {f} -> Parsed {len(joints)} joints, {len(bodies)} bodies, {len(actuators)} actuators.", file=sys.stderr)

            # Write markdown to a separate temporary file or stdout
            md = format_markdown(joints, bodies, actuators, os.path.basename(f))
            print(f"\n--- {os.path.basename(f)} Markdown output: ---", file=sys.stderr)
            # Print first 200 chars as confirmation
            print(md[:200] + "...", file=sys.stderr)

            # Let's write output to scripts/parsed_{name}.json for easier retrieval later
            out_name = f"scripts/parsed_{os.path.basename(f).replace('.xml', '')}.json"
            with open(out_name, 'w') as out_f:
                json.dump({'joints': joints, 'bodies': bodies, 'actuators': actuators, 'markdown': md}, out_f, indent=2)
            print(f"Saved parsed data to {out_name}", file=sys.stderr)
        else:
            print(f"Error: {f} does not exist", file=sys.stderr)
