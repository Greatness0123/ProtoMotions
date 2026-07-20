# SPDX-FileCopyrightText: Copyright (c) 2025-2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
# SPDX-License-Identifier: Apache-2.0

import xml.etree.ElementTree as ET
import math
import os

def compute_geom_mass(geom_type, size_str, density_str, fromto_str=None):
    density = float(density_str) if density_str else 1000.0
    sizes = [float(x) for x in size_str.split()] if size_str else []

    if geom_type == 'box':
        if len(sizes) >= 3:
            vol = 8.0 * sizes[0] * sizes[1] * sizes[2]
            return vol * density
    elif geom_type == 'capsule':
        if fromto_str:
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
    return 0.0

def generate_proportions():
    xml_path = "protomotions/data/assets/mjcf/smpl_humanoid.xml"
    if not os.path.exists(xml_path):
        print(f"Error: {xml_path} not found.")
        return

    tree = ET.parse(xml_path)
    root = tree.getroot()
    worldbody = root.find('worldbody')

    bodies_data = []

    def traverse(elem, parent_name):
        body_name = elem.get('name')
        if not body_name:
            return

        pos_str = elem.get('pos', '0 0 0')
        pos = [float(x) for x in pos_str.split()]
        length = math.sqrt(sum(x**2 for x in pos))

        # Geoms
        geoms = elem.findall('geom')
        geom_type = 'None'
        geom_size = 'N/A'
        body_mass = 0.0

        for g in geoms:
            g_type = g.get('type', 'sphere')
            g_size = g.get('size', '')
            g_density = g.get('density', '1000')
            g_fromto = g.get('fromto')

            geom_type = g_type
            geom_size = g_size
            g_mass = compute_geom_mass(g_type, g_size, g_density, g_fromto)
            body_mass += g_mass

        bodies_data.append({
            'name': body_name,
            'parent': parent_name,
            'pos': pos,
            'length': length,
            'geom_type': geom_type,
            'geom_size': geom_size,
            'mass': body_mass
        })

        for child in elem.findall('body'):
            traverse(child, body_name)

    if worldbody is not None:
        for b in worldbody.findall('body'):
            traverse(b, 'worldbody')

    total_mass = sum(b['mass'] for b in bodies_data)

    print("| Body Name | Parent Name | Offset from Parent (x, y, z) | Segment Length (meters) | Geom Type | Geom Size | Approximate Mass (kg) | Mass Fraction (%) |")
    print("| --- | --- | --- | --- | --- | --- | --- | --- |")
    for b in bodies_data:
        fraction = (b['mass'] / total_mass) * 100 if total_mass > 0 else 0.0
        pos_str = f"({b['pos'][0]:.4f}, {b['pos'][1]:.4f}, {b['pos'][2]:.4f})"
        print(f"| {b['name']} | {b['parent']} | {pos_str} | {b['length']:.4f}m | {b['geom_type']} | {b['geom_size']} | {b['mass']:.5f} | {fraction:.2f}% |")

    print(f"\nTotal Calculated Body Mass: {total_mass:.5f} kg")

if __name__ == "__main__":
    generate_proportions()
