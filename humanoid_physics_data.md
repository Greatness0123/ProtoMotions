# ProtoMotions Humanoid Physics Configuration & Calibration Data

This document contains the comprehensive, 100% verbatim ground-truth physics and kinematic configurations extracted from the ProtoMotions humanoid training environment. This data is structured to easily configure real-time physics simulators like Rapier3D (Rust/WASM) and Three.js visual skeletons.

=== TASK 1: MODEL FILES FOUND ===

#### File: `protomotions/data/assets/mjcf/smpl_humanoid.xml` (Primary target, closest to standard game rigs like Mixamo)
```xml
<mujoco model="humanoid">
  <compiler coordinate="local" />
  <asset>
    <texture type="skybox" builtin="gradient" rgb1=".4 .5 .6" rgb2="0 0 0" width="100" height="100" />
    <texture builtin="flat" height="1278" mark="cross" markrgb="1 1 1" name="texgeom" random="0.01" rgb1="0.8 0.6 0.4" rgb2="0.8 0.6 0.4" type="cube" width="127" />
    <texture builtin="checker" height="100" name="texplane" rgb1="0 0 0" rgb2="0.8 0.8 0.8" type="2d" width="100" />
    <material name="MatPlane" reflectance="0.5" shininess="1" specular="1" texrepeat="60 60" texture="texplane" />
    <material name="geom" texture="texgeom" texuniform="true" />
  </asset>
  <worldbody>
    <light cutoff="100" diffuse="1 1 1" dir="-0 0 -1.3" directional="true" exponent="1" pos="0 0 1.3" specular=".1 .1 .1" />
    <body name="Pelvis" pos="-0.0018 -0.2233 0.0282">
      <geom type="box" pos="-0.0055 -0.0000 -0.0121" size="0.083 0.1069 0.0722" quat="1.0000 0.0000 0.0000 0.0000" density="1000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
      <body name="L_Hip" pos="-0.0068 0.0695 -0.0914">
        <joint name="L_Hip_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="L_Hip_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="L_Hip_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="-0.0009 0.0069 -0.0750 -0.0036 0.0274 -0.3002" size="0.0615" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
        <body name="L_Knee" pos="-0.0045 0.0343 -0.3752">
          <joint name="L_Knee_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="L_Knee_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="L_Knee_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <geom type="capsule" contype="1" conaffinity="1" density="1234.567901" fromto="-0.0087 -0.0027 -0.0796 -0.0350 -0.0109 -0.3184" size="0.0541" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
          <body name="L_Ankle" pos="-0.0437 -0.0136 -0.398">
            <joint name="L_Ankle_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="L_Ankle_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="L_Ankle_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <geom type="box" pos="0.0242 0.0233 -0.0239" size="0.085 0.0483 0.0464" quat="1.0000 0.0000 0.0000 0.0000" density="1000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
            <body name="L_Toe" pos="0.1193 0.0264 -0.0558">
              <joint name="L_Toe_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="L_Toe_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="L_Toe_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <geom type="box" pos="0.0248 -0.0030 0.0055" size="0.0496 0.0478 0.02" quat="1.0000 0.0000 0.0000 0.0000" density="1000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
            </body>
          </body>
        </body>
      </body>
      <body name="R_Hip" pos="-0.0043 -0.0677 -0.0905">
        <joint name="R_Hip_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="R_Hip_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="R_Hip_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="-0.0018 -0.0077 -0.0765 -0.0071 -0.0306 -0.3061" size="0.0606" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
        <body name="R_Knee" pos="-0.0089 -0.0383 -0.3826">
          <joint name="R_Knee_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="R_Knee_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="R_Knee_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <geom type="capsule" contype="1" conaffinity="1" density="1234.567901" fromto="-0.0085 0.0032 -0.0797 -0.0338 0.0126 -0.3187" size="0.0541" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
          <body name="R_Ankle" pos="-0.0423 0.0158 -0.3984">
            <joint name="R_Ankle_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="R_Ankle_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="R_Ankle_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <geom type="box" pos="0.0256 -0.0212 -0.0174" size="0.0865 0.0483 0.0478" quat="1.0000 0.0000 0.0000 0.0000" density="1000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
            <body name="R_Toe" pos="0.1233 -0.0254 -0.0481">
              <joint name="R_Toe_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="R_Toe_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="R_Toe_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <geom type="box" pos="0.0227 0.0042 0.0045" size="0.0493 0.0479 0.0216" quat="1.0000 0.0000 0.0000 0.0000" density="1000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
            </body>
          </body>
        </body>
      </body>
      <body name="Torso" pos="-0.0267 -0.0025 0.109">
        <joint name="Torso_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="Torso_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="Torso_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="0.0005 0.0025 0.0608 0.0006 0.0030 0.0743" size="0.0769" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
        <body name="Spine" pos="0.0011 0.0055 0.1352">
          <joint name="Spine_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="Spine_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="Spine_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="0.0114 0.0007 0.0238 0.0140 0.0008 0.0291" size="0.0755" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
          <body name="Chest" pos="0.0254 0.0015 0.0529">
            <joint name="Chest_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="Chest_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="Chest_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="-0.0173 -0.0009 0.0682 -0.0212 -0.0010 0.0833" size="0.1002" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
            <body name="Neck" pos="-0.0429 -0.0028 0.2139">
              <joint name="Neck_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="Neck_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="Neck_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0103 0.0010 0.0130 0.0411 0.0041 0.0520" size="0.0436" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
              <body name="Head" pos="0.0513 0.0052 0.065">
                <joint name="Head_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="Head_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="Head_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <geom type="box" pos="-0.0116 -0.0042 0.0876" size="0.076 0.0606 0.1154" quat="1.0000 0.0000 0.0000 0.0000" density="1000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
              </body>
            </body>
            <body name="L_Thorax" pos="-0.0341 0.0788 0.1217">
              <joint name="L_Thorax_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="L_Thorax_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="L_Thorax_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0018 0.0182 0.0061 -0.0071 0.0728 0.0244" size="0.0521" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
              <body name="L_Shoulder" pos="-0.0089 0.091 0.0305">
                <joint name="L_Shoulder_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="L_Shoulder_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="L_Shoulder_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0055 0.0519 -0.0026 -0.0220 0.2077 -0.0102" size="0.0517" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                <body name="L_Elbow" pos="-0.0275 0.2596 -0.0128">
                  <joint name="L_Elbow_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <joint name="L_Elbow_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <joint name="L_Elbow_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0002 0.0498 0.0018 -0.0009 0.1994 0.0072" size="0.0405" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                  <body name="L_Wrist" pos="-0.0012 0.2492 0.009">
                    <joint name="L_Wrist_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <joint name="L_Wrist_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <joint name="L_Wrist_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0030 0.0168 -0.0016 -0.0120 0.0672 -0.0065" size="0.0318" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                    <body name="L_Hand" pos="-0.0149 0.084 -0.0082">
                      <joint name="L_Hand_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                      <joint name="L_Hand_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                      <joint name="L_Hand_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                      <geom type="box" pos="-0.0058 0.0493 0.0010" size="0.0538 0.0585 0.0158" quat="1.0000 0.0000 0.0000 0.0000" density="1000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
                    </body>
                  </body>
                </body>
              </body>
            </body>
            <body name="R_Thorax" pos="-0.0386 -0.0818 0.1188">
              <joint name="R_Thorax_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="R_Thorax_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="R_Thorax_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0018 -0.0192 0.0065 -0.0073 -0.0768 0.0260" size="0.0511" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
              <body name="R_Shoulder" pos="-0.0091 -0.096 0.0326">
                <joint name="R_Shoulder_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="R_Shoulder_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="R_Shoulder_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0043 -0.0507 -0.0027 -0.0171 -0.2030 -0.0107" size="0.0531" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                <body name="R_Elbow" pos="-0.0214 -0.2537 -0.0133">
                  <joint name="R_Elbow_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <joint name="R_Elbow_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <joint name="R_Elbow_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0011 -0.0511 0.0016 -0.0044 -0.2042 0.0062" size="0.0408" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                  <body name="R_Wrist" pos="-0.0056 -0.2553 0.0078">
                    <joint name="R_Wrist_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <joint name="R_Wrist_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <joint name="R_Wrist_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0021 -0.0169 -0.0012 -0.0083 -0.0677 -0.0049" size="0.0326" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                    <body name="R_Hand" pos="-0.0103 -0.0846 -0.0061">
                      <joint name="R_Hand_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                      <joint name="R_Hand_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                      <joint name="R_Hand_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                      <geom type="box" pos="-0.0079 -0.0462 -0.0009" size="0.0546 0.0569 0.0164" quat="1.0000 0.0000 0.0000 0.0000" density="1000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
                    </body>
                  </body>
                </body>
              </body>
            </body>
          </body>
        </body>
      </body>
    <joint type="free" name="Pelvis" limited="false" actuatorfrclimited="false" /></body>
  </worldbody>
  <actuator>
    <motor name="L_Hip_x" joint="L_Hip_x" gear="500" />
    <motor name="L_Hip_y" joint="L_Hip_y" gear="500" />
    <motor name="L_Hip_z" joint="L_Hip_z" gear="500" />
    <motor name="L_Knee_x" joint="L_Knee_x" gear="500" />
    <motor name="L_Knee_y" joint="L_Knee_y" gear="500" />
    <motor name="L_Knee_z" joint="L_Knee_z" gear="500" />
    <motor name="L_Ankle_x" joint="L_Ankle_x" gear="500" />
    <motor name="L_Ankle_y" joint="L_Ankle_y" gear="500" />
    <motor name="L_Ankle_z" joint="L_Ankle_z" gear="500" />
    <motor name="L_Toe_x" joint="L_Toe_x" gear="500" />
    <motor name="L_Toe_y" joint="L_Toe_y" gear="500" />
    <motor name="L_Toe_z" joint="L_Toe_z" gear="500" />
    <motor name="R_Hip_x" joint="R_Hip_x" gear="500" />
    <motor name="R_Hip_y" joint="R_Hip_y" gear="500" />
    <motor name="R_Hip_z" joint="R_Hip_z" gear="500" />
    <motor name="R_Knee_x" joint="R_Knee_x" gear="500" />
    <motor name="R_Knee_y" joint="R_Knee_y" gear="500" />
    <motor name="R_Knee_z" joint="R_Knee_z" gear="500" />
    <motor name="R_Ankle_x" joint="R_Ankle_x" gear="500" />
    <motor name="R_Ankle_y" joint="R_Ankle_y" gear="500" />
    <motor name="R_Ankle_z" joint="R_Ankle_z" gear="500" />
    <motor name="R_Toe_x" joint="R_Toe_x" gear="500" />
    <motor name="R_Toe_y" joint="R_Toe_y" gear="500" />
    <motor name="R_Toe_z" joint="R_Toe_z" gear="500" />
    <motor name="Torso_x" joint="Torso_x" gear="500" />
    <motor name="Torso_y" joint="Torso_y" gear="500" />
    <motor name="Torso_z" joint="Torso_z" gear="500" />
    <motor name="Spine_x" joint="Spine_x" gear="500" />
    <motor name="Spine_y" joint="Spine_y" gear="500" />
    <motor name="Spine_z" joint="Spine_z" gear="500" />
    <motor name="Chest_x" joint="Chest_x" gear="500" />
    <motor name="Chest_y" joint="Chest_y" gear="500" />
    <motor name="Chest_z" joint="Chest_z" gear="500" />
    <motor name="Neck_x" joint="Neck_x" gear="500" />
    <motor name="Neck_y" joint="Neck_y" gear="500" />
    <motor name="Neck_z" joint="Neck_z" gear="500" />
    <motor name="Head_x" joint="Head_x" gear="500" />
    <motor name="Head_y" joint="Head_y" gear="500" />
    <motor name="Head_z" joint="Head_z" gear="500" />
    <motor name="L_Thorax_x" joint="L_Thorax_x" gear="500" />
    <motor name="L_Thorax_y" joint="L_Thorax_y" gear="500" />
    <motor name="L_Thorax_z" joint="L_Thorax_z" gear="500" />
    <motor name="L_Shoulder_x" joint="L_Shoulder_x" gear="500" />
    <motor name="L_Shoulder_y" joint="L_Shoulder_y" gear="500" />
    <motor name="L_Shoulder_z" joint="L_Shoulder_z" gear="500" />
    <motor name="L_Elbow_x" joint="L_Elbow_x" gear="500" />
    <motor name="L_Elbow_y" joint="L_Elbow_y" gear="500" />
    <motor name="L_Elbow_z" joint="L_Elbow_z" gear="500" />
    <motor name="L_Wrist_x" joint="L_Wrist_x" gear="500" />
    <motor name="L_Wrist_y" joint="L_Wrist_y" gear="500" />
    <motor name="L_Wrist_z" joint="L_Wrist_z" gear="500" />
    <motor name="L_Hand_x" joint="L_Hand_x" gear="500" />
    <motor name="L_Hand_y" joint="L_Hand_y" gear="500" />
    <motor name="L_Hand_z" joint="L_Hand_z" gear="500" />
    <motor name="R_Thorax_x" joint="R_Thorax_x" gear="500" />
    <motor name="R_Thorax_y" joint="R_Thorax_y" gear="500" />
    <motor name="R_Thorax_z" joint="R_Thorax_z" gear="500" />
    <motor name="R_Shoulder_x" joint="R_Shoulder_x" gear="500" />
    <motor name="R_Shoulder_y" joint="R_Shoulder_y" gear="500" />
    <motor name="R_Shoulder_z" joint="R_Shoulder_z" gear="500" />
    <motor name="R_Elbow_x" joint="R_Elbow_x" gear="500" />
    <motor name="R_Elbow_y" joint="R_Elbow_y" gear="500" />
    <motor name="R_Elbow_z" joint="R_Elbow_z" gear="500" />
    <motor name="R_Wrist_x" joint="R_Wrist_x" gear="500" />
    <motor name="R_Wrist_y" joint="R_Wrist_y" gear="500" />
    <motor name="R_Wrist_z" joint="R_Wrist_z" gear="500" />
    <motor name="R_Hand_x" joint="R_Hand_x" gear="500" />
    <motor name="R_Hand_y" joint="R_Hand_y" gear="500" />
    <motor name="R_Hand_z" joint="R_Hand_z" gear="500" />
  </actuator>
  <contact>
    <exclude body1="Torso" body2="Chest" />
    <exclude body1="Head" body2="Chest" />
    <exclude body1="R_Knee" body2="R_Toe" />
    <exclude body1="R_Knee" body2="L_Ankle" />
    <exclude body1="R_Knee" body2="L_Toe" />
    <exclude body1="L_Knee" body2="L_Toe" />
    <exclude body1="L_Knee" body2="R_Ankle" />
    <exclude body1="L_Knee" body2="R_Toe" />
    <exclude body1="L_Shoulder" body2="Chest" />
    <exclude body1="R_Shoulder" body2="Chest" />
  </contact>
  <sensor />
  <size njmax="700" nconmax="700" />
</mujoco>
```

##### Extracted Tables (smpl_humanoid.xml)
### Model File: `smpl_humanoid.xml`

#### 1a. Joint Definitions
| Joint Name | Type | Range (degrees) | Axis (x y z) | Armature | Damping | Stiffness | Parent Body |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pelvis | free | N/A | N/A | 0 | 0 | 0 | Pelvis |
| L_Hip_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | L_Hip |
| L_Hip_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | L_Hip |
| L_Hip_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | L_Hip |
| L_Knee_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | L_Knee |
| L_Knee_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | L_Knee |
| L_Knee_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | L_Knee |
| L_Ankle_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | L_Ankle |
| L_Ankle_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | L_Ankle |
| L_Ankle_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | L_Ankle |
| L_Toe_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | L_Toe |
| L_Toe_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | L_Toe |
| L_Toe_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | L_Toe |
| R_Hip_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | R_Hip |
| R_Hip_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | R_Hip |
| R_Hip_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | R_Hip |
| R_Knee_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | R_Knee |
| R_Knee_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | R_Knee |
| R_Knee_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | R_Knee |
| R_Ankle_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | R_Ankle |
| R_Ankle_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | R_Ankle |
| R_Ankle_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | R_Ankle |
| R_Toe_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | R_Toe |
| R_Toe_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | R_Toe |
| R_Toe_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | R_Toe |
| Torso_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 100 | 1000 | Torso |
| Torso_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 100 | 1000 | Torso |
| Torso_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 100 | 1000 | Torso |
| Spine_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 100 | 1000 | Spine |
| Spine_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 100 | 1000 | Spine |
| Spine_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 100 | 1000 | Spine |
| Chest_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 100 | 1000 | Chest |
| Chest_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 100 | 1000 | Chest |
| Chest_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 100 | 1000 | Chest |
| Neck_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | Neck |
| Neck_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | Neck |
| Neck_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | Neck |
| Head_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | Head |
| Head_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | Head |
| Head_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | Head |
| L_Thorax_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | L_Thorax |
| L_Thorax_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | L_Thorax |
| L_Thorax_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | L_Thorax |
| L_Shoulder_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | L_Shoulder |
| L_Shoulder_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | L_Shoulder |
| L_Shoulder_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | L_Shoulder |
| L_Elbow_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | L_Elbow |
| L_Elbow_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | L_Elbow |
| L_Elbow_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | L_Elbow |
| L_Wrist_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 30 | 300 | L_Wrist |
| L_Wrist_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 30 | 300 | L_Wrist |
| L_Wrist_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 30 | 300 | L_Wrist |
| L_Hand_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 30 | 300 | L_Hand |
| L_Hand_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 30 | 300 | L_Hand |
| L_Hand_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 30 | 300 | L_Hand |
| R_Thorax_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | R_Thorax |
| R_Thorax_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | R_Thorax |
| R_Thorax_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | R_Thorax |
| R_Shoulder_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | R_Shoulder |
| R_Shoulder_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | R_Shoulder |
| R_Shoulder_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | R_Shoulder |
| R_Elbow_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | R_Elbow |
| R_Elbow_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | R_Elbow |
| R_Elbow_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | R_Elbow |
| R_Wrist_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 30 | 300 | R_Wrist |
| R_Wrist_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 30 | 300 | R_Wrist |
| R_Wrist_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 30 | 300 | R_Wrist |
| R_Hand_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 30 | 300 | R_Hand |
| R_Hand_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 30 | 300 | R_Hand |
| R_Hand_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 30 | 300 | R_Hand |

#### 1b. Body (Bone) Definitions
| Body Name | Parent Body | Position Offset (x y z) | Total Mass (kg) | Inertia Diagonal | Geoms (Type, Size, Mass) |
| --- | --- | --- | --- | --- | --- |
| Pelvis | worldbody | (-0.0018, -0.2233, 0.0282) | 5.12487 | N/A (Auto-computed) | box (size=0.083 0.1069 0.0722, mass=5.12487kg) |
| L_Hip | Pelvis | (-0.0068, 0.0695, -0.0914) | 7.47244 | N/A (Auto-computed) | capsule (size=0.0615, mass=7.47244kg) |
| L_Knee | L_Hip | (-0.0045, 0.0343, -0.3752) | 3.54759 | N/A (Auto-computed) | capsule (size=0.0541, mass=3.54759kg) |
| L_Ankle | L_Knee | (-0.0437, -0.0136, -0.3980) | 1.52396 | N/A (Auto-computed) | box (size=0.085 0.0483 0.0464, mass=1.52396kg) |
| L_Toe | L_Ankle | (0.1193, 0.0264, -0.0558) | 0.37934 | N/A (Auto-computed) | box (size=0.0496 0.0478 0.02, mass=0.37934kg) |
| R_Hip | Pelvis | (-0.0043, -0.0677, -0.0905) | 7.33663 | N/A (Auto-computed) | capsule (size=0.0606, mass=7.33663kg) |
| R_Knee | R_Hip | (-0.0089, -0.0383, -0.3826) | 3.54912 | N/A (Auto-computed) | capsule (size=0.0541, mass=3.54912kg) |
| R_Ankle | R_Knee | (-0.0423, 0.0158, -0.3984) | 1.59765 | N/A (Auto-computed) | box (size=0.0865 0.0483 0.0478, mass=1.59765kg) |
| R_Toe | R_Ankle | (0.1233, -0.0254, -0.0481) | 0.40806 | N/A (Auto-computed) | box (size=0.0493 0.0479 0.0216, mass=0.40806kg) |
| Torso | Pelvis | (-0.0267, -0.0025, 0.1090) | 4.39972 | N/A (Auto-computed) | capsule (size=0.0769, mass=4.39972kg) |
| Spine | Torso | (0.0011, 0.0055, 0.1352) | 3.89481 | N/A (Auto-computed) | capsule (size=0.0755, mass=3.89481kg) |
| Chest | Spine | (0.0254, 0.0015, 0.0529) | 9.60386 | N/A (Auto-computed) | capsule (size=0.1002, mass=9.60386kg) |
| Neck | Chest | (-0.0429, -0.0028, 0.2139) | 0.64454 | N/A (Auto-computed) | capsule (size=0.0436, mass=0.64454kg) |
| Head | Neck | (0.0513, 0.0052, 0.0650) | 4.25189 | N/A (Auto-computed) | box (size=0.076 0.0606 0.1154, mass=4.25189kg) |
| L_Thorax | Chest | (-0.0341, 0.0788, 0.1217) | 1.08552 | N/A (Auto-computed) | capsule (size=0.0521, mass=1.08552kg) |
| L_Shoulder | L_Thorax | (-0.0089, 0.0910, 0.0305) | 1.89598 | N/A (Auto-computed) | capsule (size=0.0517, mass=1.89598kg) |
| L_Elbow | L_Shoulder | (-0.0275, 0.2596, -0.0128) | 1.04966 | N/A (Auto-computed) | capsule (size=0.0405, mass=1.04966kg) |
| L_Wrist | L_Elbow | (-0.0012, 0.2492, 0.0090) | 0.29809 | N/A (Auto-computed) | capsule (size=0.0318, mass=0.29809kg) |
| L_Hand | L_Wrist | (-0.0149, 0.0840, -0.0082) | 0.39782 | N/A (Auto-computed) | box (size=0.0538 0.0585 0.0158, mass=0.39782kg) |
| R_Thorax | Chest | (-0.0386, -0.0818, 0.1188) | 1.05981 | N/A (Auto-computed) | capsule (size=0.0511, mass=1.05981kg) |
| R_Shoulder | R_Thorax | (-0.0091, -0.0960, 0.0326) | 1.98284 | N/A (Auto-computed) | capsule (size=0.0531, mass=1.98284kg) |
| R_Elbow | R_Shoulder | (-0.0214, -0.2537, -0.0133) | 1.08569 | N/A (Auto-computed) | capsule (size=0.0408, mass=1.08569kg) |
| R_Wrist | R_Elbow | (-0.0056, -0.2553, 0.0078) | 0.31644 | N/A (Auto-computed) | capsule (size=0.0326, mass=0.31644kg) |
| R_Hand | R_Wrist | (-0.0103, -0.0846, -0.0061) | 0.40760 | N/A (Auto-computed) | box (size=0.0546 0.0569 0.0164, mass=0.40760kg) |

#### 1c. Actuator Definitions
| Actuator Name | Joint Controlled | Gear Ratio / Scale | Ctrl Range | Force Limit |
| --- | --- | --- | --- | --- |
| L_Hip_x | L_Hip_x | 500 | N/A | N/A |
| L_Hip_y | L_Hip_y | 500 | N/A | N/A |
| L_Hip_z | L_Hip_z | 500 | N/A | N/A |
| L_Knee_x | L_Knee_x | 500 | N/A | N/A |
| L_Knee_y | L_Knee_y | 500 | N/A | N/A |
| L_Knee_z | L_Knee_z | 500 | N/A | N/A |
| L_Ankle_x | L_Ankle_x | 500 | N/A | N/A |
| L_Ankle_y | L_Ankle_y | 500 | N/A | N/A |
| L_Ankle_z | L_Ankle_z | 500 | N/A | N/A |
| L_Toe_x | L_Toe_x | 500 | N/A | N/A |
| L_Toe_y | L_Toe_y | 500 | N/A | N/A |
| L_Toe_z | L_Toe_z | 500 | N/A | N/A |
| R_Hip_x | R_Hip_x | 500 | N/A | N/A |
| R_Hip_y | R_Hip_y | 500 | N/A | N/A |
| R_Hip_z | R_Hip_z | 500 | N/A | N/A |
| R_Knee_x | R_Knee_x | 500 | N/A | N/A |
| R_Knee_y | R_Knee_y | 500 | N/A | N/A |
| R_Knee_z | R_Knee_z | 500 | N/A | N/A |
| R_Ankle_x | R_Ankle_x | 500 | N/A | N/A |
| R_Ankle_y | R_Ankle_y | 500 | N/A | N/A |
| R_Ankle_z | R_Ankle_z | 500 | N/A | N/A |
| R_Toe_x | R_Toe_x | 500 | N/A | N/A |
| R_Toe_y | R_Toe_y | 500 | N/A | N/A |
| R_Toe_z | R_Toe_z | 500 | N/A | N/A |
| Torso_x | Torso_x | 500 | N/A | N/A |
| Torso_y | Torso_y | 500 | N/A | N/A |
| Torso_z | Torso_z | 500 | N/A | N/A |
| Spine_x | Spine_x | 500 | N/A | N/A |
| Spine_y | Spine_y | 500 | N/A | N/A |
| Spine_z | Spine_z | 500 | N/A | N/A |
| Chest_x | Chest_x | 500 | N/A | N/A |
| Chest_y | Chest_y | 500 | N/A | N/A |
| Chest_z | Chest_z | 500 | N/A | N/A |
| Neck_x | Neck_x | 500 | N/A | N/A |
| Neck_y | Neck_y | 500 | N/A | N/A |
| Neck_z | Neck_z | 500 | N/A | N/A |
| Head_x | Head_x | 500 | N/A | N/A |
| Head_y | Head_y | 500 | N/A | N/A |
| Head_z | Head_z | 500 | N/A | N/A |
| L_Thorax_x | L_Thorax_x | 500 | N/A | N/A |
| L_Thorax_y | L_Thorax_y | 500 | N/A | N/A |
| L_Thorax_z | L_Thorax_z | 500 | N/A | N/A |
| L_Shoulder_x | L_Shoulder_x | 500 | N/A | N/A |
| L_Shoulder_y | L_Shoulder_y | 500 | N/A | N/A |
| L_Shoulder_z | L_Shoulder_z | 500 | N/A | N/A |
| L_Elbow_x | L_Elbow_x | 500 | N/A | N/A |
| L_Elbow_y | L_Elbow_y | 500 | N/A | N/A |
| L_Elbow_z | L_Elbow_z | 500 | N/A | N/A |
| L_Wrist_x | L_Wrist_x | 500 | N/A | N/A |
| L_Wrist_y | L_Wrist_y | 500 | N/A | N/A |
| L_Wrist_z | L_Wrist_z | 500 | N/A | N/A |
| L_Hand_x | L_Hand_x | 500 | N/A | N/A |
| L_Hand_y | L_Hand_y | 500 | N/A | N/A |
| L_Hand_z | L_Hand_z | 500 | N/A | N/A |
| R_Thorax_x | R_Thorax_x | 500 | N/A | N/A |
| R_Thorax_y | R_Thorax_y | 500 | N/A | N/A |
| R_Thorax_z | R_Thorax_z | 500 | N/A | N/A |
| R_Shoulder_x | R_Shoulder_x | 500 | N/A | N/A |
| R_Shoulder_y | R_Shoulder_y | 500 | N/A | N/A |
| R_Shoulder_z | R_Shoulder_z | 500 | N/A | N/A |
| R_Elbow_x | R_Elbow_x | 500 | N/A | N/A |
| R_Elbow_y | R_Elbow_y | 500 | N/A | N/A |
| R_Elbow_z | R_Elbow_z | 500 | N/A | N/A |
| R_Wrist_x | R_Wrist_x | 500 | N/A | N/A |
| R_Wrist_y | R_Wrist_y | 500 | N/A | N/A |
| R_Wrist_z | R_Wrist_z | 500 | N/A | N/A |
| R_Hand_x | R_Hand_x | 500 | N/A | N/A |
| R_Hand_y | R_Hand_y | 500 | N/A | N/A |
| R_Hand_z | R_Hand_z | 500 | N/A | N/A |


---

#### File: `protomotions/data/assets/mjcf/amp_humanoid.xml` (Secondary comparative target)
```xml
<mujoco model="humanoid">

  <statistic extent="2" center="0 0 1" />

  <option timestep="0.00555" />

  <worldbody>
    <body name="pelvis" pos="0 0 1">
      <site name="root" size=".01 .01 .02" group="3" type="box" rgba="1 0 0 1" />
      <geom name="pelvis" type="sphere" pos="0 0 0.07" size=".09" density="2226" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
      <geom name="upper_waist" type="sphere" pos="0 0 0.205" size="0.07" density="2226" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
      <site name="pelvis" type="sphere" pos="0 0 0.07" size="0.091" group="3" rgba="0 0 1 .3" />
      <site name="upper_waist" type="sphere" pos="0 0 0.205" size="0.071" group="3" rgba="0 0 1 .3" />

      <body name="torso" pos="0 0 0.236151">
        <light name="top" pos="0 0 2" mode="trackcom" />
        <camera name="back" pos="-3 0 1" xyaxes="0 -1 0 1 0 2" mode="trackcom" />
        <camera name="side" pos="0 -3 1" xyaxes="1 0 0 0 1 2" mode="trackcom" />
        <joint name="abdomen_x" pos="0 0 0" axis="1 0 0" range="-60 60" stiffness="1000" damping="100" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
        <joint name="abdomen_y" pos="0 0 0" axis="0 1 0" range="-60 90" stiffness="1000" damping="100" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
        <joint name="abdomen_z" pos="0 0 0" axis="0 0 1" range="-50 50" stiffness="1000" damping="100" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
        <geom name="torso" type="sphere" pos="0 0 0.12" size="0.11" density="1794" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
        <site name="torso" type="sphere" pos="0 0 0.12" size="0.111" group="3" rgba="0 0 1 .3" />

        <geom name="right_clavicle" fromto="-0.0060125 -0.0457775 0.2287955 -0.016835 -0.128177 0.2376182" size=".045" density="1100" type="capsule" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
        <geom name="left_clavicle" fromto="-0.0060125 0.0457775 0.2287955 -0.016835 0.128177 0.2376182" size=".045" density="1100" type="capsule" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />

        <body name="head" pos="0 0 0.223894">
          <joint name="neck_x" axis="1 0 0" range="-50 50" stiffness="100" damping="10" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <joint name="neck_y" axis="0 1 0" range="-40 60" stiffness="100" damping="10" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <joint name="neck_z" axis="0 0 1" range="-45 45" stiffness="100" damping="10" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <geom name="head" type="sphere" pos="0 0 0.175" size="0.095" density="1081" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
          <geom name="neck" type="sphere" pos="0 0 0.075" size="0.05" density="1081" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
          <site name="head" pos="0 0 0.175" type="sphere" size="0.103" group="3" rgba="0 0 1 .3" />
          <camera name="egocentric" pos=".103 0 0.175" xyaxes="0 -1 0 .1 0 1" fovy="80" />
        </body>

        <body name="right_upper_arm" pos="-0.02405 -0.18311 0.24350">
          <joint name="right_shoulder_x" axis="1 0 0" range="-180 45" stiffness="400" damping="40" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <joint name="right_shoulder_y" axis="0 1 0" range="-180 60" stiffness="400" damping="40" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <joint name="right_shoulder_z" axis="0 0 1" range="-90 90" stiffness="400" damping="40" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <geom name="right_upper_arm" fromto="0 0 -0.05 0 0 -0.23" size=".045" density="982" type="capsule" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
          <site name="right_upper_arm" pos="0 0 -0.14" size="0.046 0.1" zaxis="0 0 1" group="3" type="capsule" rgba="0 0 1 .3" />

          <body name="right_lower_arm" pos="0 0 -0.274788">
            <joint name="right_elbow_x" axis="1 0 0" range="-30 30" stiffness="300" damping="30" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <joint name="right_elbow_y" axis="0 1 0" range="-160 0" stiffness="300" damping="30" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <joint name="right_elbow_z" axis="0 0 1" range="-30 30" stiffness="300" damping="30" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <geom name="right_lower_arm" fromto="0 0 -0.0525 0 0 -0.1875" size="0.04" density="1056" type="capsule" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
            <site name="right_lower_arm" pos="0 0 -0.12" size="0.041 0.0685" zaxis="0 1 0" group="3" type="capsule" rgba="0 0 1 .3" />

            <body name="right_hand" pos="0 0 -0.258947">
              <geom name="right_hand" type="sphere" size=".04" density="1865" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
              <site name="right_hand" type="sphere" size=".041" group="3" rgba="0 0 1 .3" />
            </body>
          </body>
        </body>

        <body name="left_upper_arm" pos="-0.02405 0.18311 0.24350">
          <joint name="left_shoulder_x" axis="1 0 0" range="-45 180" stiffness="400" damping="40" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <joint name="left_shoulder_y" axis="0 1 0" range="-180 60" stiffness="400" damping="40" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <joint name="left_shoulder_z" axis="0 0 1" range="-90 90" stiffness="400" damping="40" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <geom name="left_upper_arm" fromto="0 0 -0.05 0 0 -0.23" size="0.045" density="982" type="capsule" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
          <site name="left_upper_arm" pos="0 0 -0.14" size="0.046 0.1" zaxis="0 0 1" group="3" type="capsule" rgba="0 0 1 .3" />

          <body name="left_lower_arm" pos="0 0 -0.274788">
            <joint name="left_elbow_x" axis="1 0 0" range="-30 30" stiffness="300" damping="30" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <joint name="left_elbow_y" axis="0 1 0" range="-160 0" stiffness="300" damping="30" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <joint name="left_elbow_z" axis="0 0 1" range="-30 30" stiffness="300" damping="30" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <geom name="left_lower_arm" fromto="0 0 -0.0525 0 0 -0.1875" size="0.04" density="1056" type="capsule" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
            <site name="left_lower_arm" pos="0 0 -0.1" size="0.041 0.0685" zaxis="0 0 1" group="3" type="capsule" rgba="0 0 1 .3" />

            <body name="left_hand" pos="0 0 -0.258947">
              <geom name="left_hand" type="sphere" size=".04" density="1865" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
              <site name="left_hand" type="sphere" size=".041" group="3" rgba="0 0 1 .3" />
            </body>
          </body>
        </body>
      </body>

      <body name="right_thigh" pos="0 -0.084887 0">
        <site name="right_hip" size=".01 .01 .02" group="3" type="box" rgba="1 0 0 1" />
        <joint name="right_hip_x" axis="1 0 0" range="-60 15" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
        <joint name="right_hip_y" axis="0 1 0" range="-140 60" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
        <joint name="right_hip_z" axis="0 0 1" range="-60 35" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
        <geom name="right_thigh" fromto="0 0 -0.06 0 0 -0.36" size="0.055" density="1269" type="capsule" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
        <site name="right_thigh" pos="0 0 -0.21" size="0.056 0.301" zaxis="0 0 -1" group="3" type="capsule" rgba="0 0 1 .3" />

        <body name="right_shin" pos="0 0 -0.421546">
          <site name="right_knee" pos="0 0 0" size=".01 .01 .02" group="3" type="box" rgba="1 0 0 1" />
          <joint name="right_knee_x" pos="0 0 0" axis="1 0 0" range="-30 30" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <joint name="right_knee_y" pos="0 0 0" axis="0 1 0" range="0 160" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <joint name="right_knee_z" pos="0 0 0" axis="0 0 1" range="-30 30" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <geom name="right_shin" fromto="0 0 -0.045 0 0 -0.355" size=".05" density="1014" type="capsule" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
          <site name="right_shin" pos="0 0 -0.2" size="0.051 0.156" zaxis="0 0 -1" group="3" type="capsule" rgba="0 0 1 .3" />

          <body name="right_foot" pos="0 0 -0.409870">
            <site name="right_ankle" size=".01 .01 .02" group="3" type="box" rgba="1 0 0 1" />
            <joint name="right_ankle_x" pos="0 0 0" axis="1 0 0" range="-30 30" stiffness="400" damping="40" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <joint name="right_ankle_y" pos="0 0 0" axis="0 1 0" range="-55 55" stiffness="400" damping="40" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <joint name="right_ankle_z" pos="0 0 0" axis="0 0 1" range="-40 40" stiffness="400" damping="40" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <geom name="right_foot" type="box" pos="0.045 0 -0.0225" size="0.0885 0.045 0.0275" density="1141" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
            <site name="right_foot" type="box" pos="0.045 0 -0.0225" size="0.0895 0.055 0.0285" group="3" rgba="0 0 1 .3" />
          </body>
        </body>
      </body>

      <body name="left_thigh" pos="0 0.084887 0">
        <site name="left_hip" size=".01 .01 .02" group="3" type="box" rgba="1 0 0 1" />
        <joint name="left_hip_x" axis="1 0 0" range="-15 60" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
        <joint name="left_hip_y" axis="0 1 0" range="-140 60" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
        <joint name="left_hip_z" axis="0 0 1" range="-35 60" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
        <geom name="left_thigh" fromto="0 0 -0.06 0 0 -0.36" size=".055" density="1269" type="capsule" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
        <site name="left_thigh" pos="0 0 -0.21" size="0.056 0.301" zaxis="0 0 -1" group="3" type="capsule" rgba="0 0 1 .3" />

        <body name="left_shin" pos="0 0 -0.421546">
          <site name="left_knee" pos="0 0 .02" size=".01 .01 .02" group="3" type="box" rgba="1 0 0 1" />
          <joint name="left_knee_x" pos="0 0 0" axis="1 0 0" range="-30 30" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <joint name="left_knee_y" pos="0 0 0" axis="0 1 0" range="0 160" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <joint name="left_knee_z" pos="0 0 0" axis="0 0 1" range="-30 30" stiffness="500" damping="50" armature=".02" type="hinge" limited="true" solimplimit="0 .99 .01" />
          <geom name="left_shin" fromto="0 0 -0.045 0 0 -0.355" size=".05" density="1014" type="capsule" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
          <site name="left_shin" pos="0 0 -0.2" size="0.051 0.156" zaxis="0 0 -1" group="3" type="capsule" rgba="0 0 1 .3" />

          <body name="left_foot" pos="0 0 -0.409870">
            <site name="left_ankle" size=".01 .01 .02" group="3" type="box" rgba="1 0 0 1" />
            <joint name="left_ankle_x" pos="0 0 0" axis="1 0 0" range="-30 30" stiffness="400" damping="40" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <joint name="left_ankle_y" pos="0 0 0" axis="0 1 0" range="-55 55" stiffness="400" damping="40" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <joint name="left_ankle_z" pos="0 0 0" axis="0 0 1" range="-40 40" stiffness="400" damping="40" armature=".01" type="hinge" limited="true" solimplimit="0 .99 .01" />
            <geom name="left_foot" type="box" pos="0.045 0 -0.0225" size="0.0885 0.045 0.0275" density="1141" condim="1" friction="1.0 0.05 0.05" solimp=".9 .99 .003" solref=".015 1" />
            <site name="left_foot" type="box" pos="0.045 0 -0.0225" size="0.0895 0.055 0.0285" group="3" rgba="0 0 1 .3" />
          </body>
        </body>
      </body>
    <joint type="free" name="root" limited="false" actuatorfrclimited="false" /></body>
  </worldbody>

  <actuator>
    <motor name="abdomen_x" gear="200" joint="abdomen_x" />
    <motor name="abdomen_y" gear="200" joint="abdomen_y" />
    <motor name="abdomen_z" gear="200" joint="abdomen_z" />
    <motor name="neck_x" gear="50" joint="neck_x" />
    <motor name="neck_y" gear="50" joint="neck_y" />
    <motor name="neck_z" gear="50" joint="neck_z" />
    <motor name="right_shoulder_x" gear="100" joint="right_shoulder_x" />
    <motor name="right_shoulder_y" gear="100" joint="right_shoulder_y" />
    <motor name="right_shoulder_z" gear="100" joint="right_shoulder_z" />
    <motor name="right_elbow_x" gear="70" joint="right_elbow_x" />
    <motor name="right_elbow_y" gear="70" joint="right_elbow_y" />
    <motor name="right_elbow_z" gear="70" joint="right_elbow_z" />
    <motor name="left_shoulder_x" gear="100" joint="left_shoulder_x" />
    <motor name="left_shoulder_y" gear="100" joint="left_shoulder_y" />
    <motor name="left_shoulder_z" gear="100" joint="left_shoulder_z" />
    <motor name="left_elbow_x" gear="70" joint="left_elbow_x" />
    <motor name="left_elbow_y" gear="70" joint="left_elbow_y" />
    <motor name="left_elbow_z" gear="70" joint="left_elbow_z" />
    <motor name="right_hip_x" gear="200" joint="right_hip_x" />
    <motor name="right_hip_z" gear="200" joint="right_hip_z" />
    <motor name="right_hip_y" gear="200" joint="right_hip_y" />
    <motor name="right_knee_x" gear="150" joint="right_knee_x" />
    <motor name="right_knee_y" gear="150" joint="right_knee_y" />
    <motor name="right_knee_z" gear="150" joint="right_knee_z" />
    <motor name="right_ankle_x" gear="90" joint="right_ankle_x" />
    <motor name="right_ankle_y" gear="90" joint="right_ankle_y" />
    <motor name="right_ankle_z" gear="90" joint="right_ankle_z" />
    <motor name="left_hip_x" gear="200" joint="left_hip_x" />
    <motor name="left_hip_z" gear="200" joint="left_hip_z" />
    <motor name="left_hip_y" gear="200" joint="left_hip_y" />
    <motor name="left_knee_x" gear="150" joint="left_knee_x" />
    <motor name="left_knee_y" gear="150" joint="left_knee_y" />
    <motor name="left_knee_z" gear="150" joint="left_knee_z" />
    <motor name="left_ankle_x" gear="90" joint="left_ankle_x" />
    <motor name="left_ankle_y" gear="90" joint="left_ankle_y" />
    <motor name="left_ankle_z" gear="90" joint="left_ankle_z" />
  </actuator>

  <sensor>
    <subtreelinvel name="pelvis_subtreelinvel" body="pelvis" />
    <accelerometer name="root_accel" site="root" />
    <velocimeter name="root_vel" site="root" />
    <gyro name="root_gyro" site="root" />

    <force name="left_ankle_force" site="left_ankle" />
    <force name="right_ankle_force" site="right_ankle" />
    <force name="left_knee_force" site="left_knee" />
    <force name="right_knee_force" site="right_knee" />
    <force name="left_hip_force" site="left_hip" />
    <force name="right_hip_force" site="right_hip" />

    <torque name="left_ankle_torque" site="left_ankle" />
    <torque name="right_ankle_torque" site="right_ankle" />
    <torque name="left_knee_torque" site="left_knee" />
    <torque name="right_knee_torque" site="right_knee" />
    <torque name="left_hip_torque" site="left_hip" />
    <torque name="right_hip_torque" site="right_hip" />

    <touch name="pelvis_touch" site="pelvis" />
    <touch name="upper_waist_touch" site="upper_waist" />
    <touch name="torso_touch" site="torso" />
    <touch name="head_touch" site="head" />
    <touch name="right_upper_arm_touch" site="right_upper_arm" />
    <touch name="right_lower_arm_touch" site="right_lower_arm" />
    <touch name="right_hand_touch" site="right_hand" />
    <touch name="left_upper_arm_touch" site="left_upper_arm" />
    <touch name="left_lower_arm_touch" site="left_lower_arm" />
    <touch name="left_hand_touch" site="left_hand" />
    <touch name="right_thigh_touch" site="right_thigh" />
    <touch name="right_shin_touch" site="right_shin" />
    <touch name="right_foot_touch" site="right_foot" />
    <touch name="left_thigh_touch" site="left_thigh" />
    <touch name="left_shin_touch" site="left_shin" />
    <touch name="left_foot_touch" site="left_foot" />
  </sensor>

</mujoco>
```

##### Extracted Tables (amp_humanoid.xml)
### Model File: `amp_humanoid.xml`

#### 1a. Joint Definitions
| Joint Name | Type | Range (degrees) | Axis (x y z) | Armature | Damping | Stiffness | Parent Body |
| --- | --- | --- | --- | --- | --- | --- | --- |
| root | free | N/A | N/A | 0 | 0 | 0 | pelvis |
| abdomen_x | hinge | -60 60 | 1 0 0 | .02 | 100 | 1000 | torso |
| abdomen_y | hinge | -60 90 | 0 1 0 | .02 | 100 | 1000 | torso |
| abdomen_z | hinge | -50 50 | 0 0 1 | .02 | 100 | 1000 | torso |
| neck_x | hinge | -50 50 | 1 0 0 | .01 | 10 | 100 | head |
| neck_y | hinge | -40 60 | 0 1 0 | .01 | 10 | 100 | head |
| neck_z | hinge | -45 45 | 0 0 1 | .01 | 10 | 100 | head |
| right_shoulder_x | hinge | -180 45 | 1 0 0 | .02 | 40 | 400 | right_upper_arm |
| right_shoulder_y | hinge | -180 60 | 0 1 0 | .02 | 40 | 400 | right_upper_arm |
| right_shoulder_z | hinge | -90 90 | 0 0 1 | .02 | 40 | 400 | right_upper_arm |
| right_elbow_x | hinge | -30 30 | 1 0 0 | .01 | 30 | 300 | right_lower_arm |
| right_elbow_y | hinge | -160 0 | 0 1 0 | .01 | 30 | 300 | right_lower_arm |
| right_elbow_z | hinge | -30 30 | 0 0 1 | .01 | 30 | 300 | right_lower_arm |
| left_shoulder_x | hinge | -45 180 | 1 0 0 | .02 | 40 | 400 | left_upper_arm |
| left_shoulder_y | hinge | -180 60 | 0 1 0 | .02 | 40 | 400 | left_upper_arm |
| left_shoulder_z | hinge | -90 90 | 0 0 1 | .02 | 40 | 400 | left_upper_arm |
| left_elbow_x | hinge | -30 30 | 1 0 0 | .01 | 30 | 300 | left_lower_arm |
| left_elbow_y | hinge | -160 0 | 0 1 0 | .01 | 30 | 300 | left_lower_arm |
| left_elbow_z | hinge | -30 30 | 0 0 1 | .01 | 30 | 300 | left_lower_arm |
| right_hip_x | hinge | -60 15 | 1 0 0 | .02 | 50 | 500 | right_thigh |
| right_hip_y | hinge | -140 60 | 0 1 0 | .02 | 50 | 500 | right_thigh |
| right_hip_z | hinge | -60 35 | 0 0 1 | .02 | 50 | 500 | right_thigh |
| right_knee_x | hinge | -30 30 | 1 0 0 | .02 | 50 | 500 | right_shin |
| right_knee_y | hinge | 0 160 | 0 1 0 | .02 | 50 | 500 | right_shin |
| right_knee_z | hinge | -30 30 | 0 0 1 | .02 | 50 | 500 | right_shin |
| right_ankle_x | hinge | -30 30 | 1 0 0 | .01 | 40 | 400 | right_foot |
| right_ankle_y | hinge | -55 55 | 0 1 0 | .01 | 40 | 400 | right_foot |
| right_ankle_z | hinge | -40 40 | 0 0 1 | .01 | 40 | 400 | right_foot |
| left_hip_x | hinge | -15 60 | 1 0 0 | .02 | 50 | 500 | left_thigh |
| left_hip_y | hinge | -140 60 | 0 1 0 | .02 | 50 | 500 | left_thigh |
| left_hip_z | hinge | -35 60 | 0 0 1 | .02 | 50 | 500 | left_thigh |
| left_knee_x | hinge | -30 30 | 1 0 0 | .02 | 50 | 500 | left_shin |
| left_knee_y | hinge | 0 160 | 0 1 0 | .02 | 50 | 500 | left_shin |
| left_knee_z | hinge | -30 30 | 0 0 1 | .02 | 50 | 500 | left_shin |
| left_ankle_x | hinge | -30 30 | 1 0 0 | .01 | 40 | 400 | left_foot |
| left_ankle_y | hinge | -55 55 | 0 1 0 | .01 | 40 | 400 | left_foot |
| left_ankle_z | hinge | -40 40 | 0 0 1 | .01 | 40 | 400 | left_foot |

#### 1b. Body (Bone) Definitions
| Body Name | Parent Body | Position Offset (x y z) | Total Mass (kg) | Inertia Diagonal | Geoms (Type, Size, Mass) |
| --- | --- | --- | --- | --- | --- |
| pelvis | worldbody | (0.0000, 0.0000, 1.0000) | 9.99559 | N/A (Auto-computed) | sphere (size=.09, mass=6.79738kg), sphere (size=0.07, mass=3.19822kg) |
| torso | pelvis | (0.0000, 0.0000, 0.2362) | 12.01149 | N/A (Auto-computed) | sphere (size=0.11, mass=10.00205kg), capsule (size=.045, mass=1.00472kg), capsule (size=.045, mass=1.00472kg) |
| head | torso | (0.0000, 0.0000, 0.2239) | 4.44827 | N/A (Auto-computed) | sphere (size=0.095, mass=3.88226kg), sphere (size=0.05, mass=0.56601kg) |
| right_upper_arm | torso | (-0.0240, -0.1831, 0.2435) | 1.49933 | N/A (Auto-computed) | capsule (size=.045, mass=1.49933kg) |
| right_lower_arm | right_upper_arm | (0.0000, 0.0000, -0.2748) | 0.99968 | N/A (Auto-computed) | capsule (size=0.04, mass=0.99968kg) |
| right_hand | right_lower_arm | (0.0000, 0.0000, -0.2589) | 0.49997 | N/A (Auto-computed) | sphere (size=.04, mass=0.49997kg) |
| left_upper_arm | torso | (-0.0240, 0.1831, 0.2435) | 1.49933 | N/A (Auto-computed) | capsule (size=0.045, mass=1.49933kg) |
| left_lower_arm | left_upper_arm | (0.0000, 0.0000, -0.2748) | 0.99968 | N/A (Auto-computed) | capsule (size=0.04, mass=0.99968kg) |
| left_hand | left_lower_arm | (0.0000, 0.0000, -0.2589) | 0.49997 | N/A (Auto-computed) | sphere (size=.04, mass=0.49997kg) |
| right_thigh | pelvis | (0.0000, -0.0849, 0.0000) | 4.50229 | N/A (Auto-computed) | capsule (size=0.055, mass=4.50229kg) |
| right_shin | right_thigh | (0.0000, 0.0000, -0.4215) | 2.99975 | N/A (Auto-computed) | capsule (size=.05, mass=2.99975kg) |
| right_foot | right_shin | (0.0000, 0.0000, -0.4099) | 0.99969 | N/A (Auto-computed) | box (size=0.0885 0.045 0.0275, mass=0.99969kg) |
| left_thigh | pelvis | (0.0000, 0.0849, 0.0000) | 4.50229 | N/A (Auto-computed) | capsule (size=.055, mass=4.50229kg) |
| left_shin | left_thigh | (0.0000, 0.0000, -0.4215) | 2.99975 | N/A (Auto-computed) | capsule (size=.05, mass=2.99975kg) |
| left_foot | left_shin | (0.0000, 0.0000, -0.4099) | 0.99969 | N/A (Auto-computed) | box (size=0.0885 0.045 0.0275, mass=0.99969kg) |

#### 1c. Actuator Definitions
| Actuator Name | Joint Controlled | Gear Ratio / Scale | Ctrl Range | Force Limit |
| --- | --- | --- | --- | --- |
| abdomen_x | abdomen_x | 200 | N/A | N/A |
| abdomen_y | abdomen_y | 200 | N/A | N/A |
| abdomen_z | abdomen_z | 200 | N/A | N/A |
| neck_x | neck_x | 50 | N/A | N/A |
| neck_y | neck_y | 50 | N/A | N/A |
| neck_z | neck_z | 50 | N/A | N/A |
| right_shoulder_x | right_shoulder_x | 100 | N/A | N/A |
| right_shoulder_y | right_shoulder_y | 100 | N/A | N/A |
| right_shoulder_z | right_shoulder_z | 100 | N/A | N/A |
| right_elbow_x | right_elbow_x | 70 | N/A | N/A |
| right_elbow_y | right_elbow_y | 70 | N/A | N/A |
| right_elbow_z | right_elbow_z | 70 | N/A | N/A |
| left_shoulder_x | left_shoulder_x | 100 | N/A | N/A |
| left_shoulder_y | left_shoulder_y | 100 | N/A | N/A |
| left_shoulder_z | left_shoulder_z | 100 | N/A | N/A |
| left_elbow_x | left_elbow_x | 70 | N/A | N/A |
| left_elbow_y | left_elbow_y | 70 | N/A | N/A |
| left_elbow_z | left_elbow_z | 70 | N/A | N/A |
| right_hip_x | right_hip_x | 200 | N/A | N/A |
| right_hip_z | right_hip_z | 200 | N/A | N/A |
| right_hip_y | right_hip_y | 200 | N/A | N/A |
| right_knee_x | right_knee_x | 150 | N/A | N/A |
| right_knee_y | right_knee_y | 150 | N/A | N/A |
| right_knee_z | right_knee_z | 150 | N/A | N/A |
| right_ankle_x | right_ankle_x | 90 | N/A | N/A |
| right_ankle_y | right_ankle_y | 90 | N/A | N/A |
| right_ankle_z | right_ankle_z | 90 | N/A | N/A |
| left_hip_x | left_hip_x | 200 | N/A | N/A |
| left_hip_z | left_hip_z | 200 | N/A | N/A |
| left_hip_y | left_hip_y | 200 | N/A | N/A |
| left_knee_x | left_knee_x | 150 | N/A | N/A |
| left_knee_y | left_knee_y | 150 | N/A | N/A |
| left_knee_z | left_knee_z | 150 | N/A | N/A |
| left_ankle_x | left_ankle_x | 90 | N/A | N/A |
| left_ankle_y | left_ankle_y | 90 | N/A | N/A |
| left_ankle_z | left_ankle_z | 90 | N/A | N/A |


---

#### File: `protomotions/data/assets/mjcf/smplx_humanoid.xml` (Target for detailed finger/hand joint definitions)
```xml
<mujoco model="humanoid">
  <compiler coordinate="local" />
  <asset>
    <texture type="skybox" builtin="gradient" rgb1=".4 .5 .6" rgb2="0 0 0" width="100" height="100" />
    <texture builtin="flat" height="1278" mark="cross" markrgb="1 1 1" name="texgeom" random="0.01" rgb1="0.8 0.6 0.4" rgb2="0.8 0.6 0.4" type="cube" width="127" />
    <texture builtin="checker" height="100" name="texplane" rgb1="0 0 0" rgb2="0.8 0.8 0.8" type="2d" width="100" />
    <material name="MatPlane" reflectance="0.5" shininess="1" specular="1" texrepeat="60 60" texture="texplane" />
    <material name="geom" texture="texgeom" texuniform="true" />
  </asset>
  <worldbody>
    <light cutoff="100" diffuse="1 1 1" dir="-0 0 -1.3" directional="true" exponent="1" pos="0 0 1.3" specular=".1 .1 .1" />
    <geom conaffinity="1" condim="3" name="floor" pos="0 0 0" rgba="0.8 0.9 0.8 1" size="100 100 .2" type="plane" material="MatPlane" contype="7" margin="0.001" />
    <body name="Pelvis" pos="0.0031 -0.3514 0.012">
      <geom type="box" density="3021.964055" pos="-0.0168 -0.0031 -0.0215" size="0.084 0.1079 0.0846" quat="1.0000 0.0000 0.0000 0.0000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
      <body name="L_Hip" pos="-0.026 0.0582 -0.0928">
        <joint name="L_Hip_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="L_Hip_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="L_Hip_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="-0.0019 0.0109 -0.0758 -0.0075 0.0438 -0.3030" size="0.0605" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
        <body name="L_Knee" pos="-0.0094 0.0547 -0.3788">
          <joint name="L_Knee_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="L_Knee_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="L_Knee_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <geom type="capsule" contype="1" conaffinity="1" density="1234.567901" fromto="-0.0064 -0.0087 -0.0806 -0.0255 -0.0348 -0.3224" size="0.0533" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
          <body name="L_Ankle" pos="-0.0319 -0.0435 -0.4031">
            <joint name="L_Ankle_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="L_Ankle_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="L_Ankle_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <geom type="box" density="445.819676" pos="0.0232 0.0407 -0.0287" size="0.0857 0.0498 0.0463" quat="1.0000 0.0000 0.0000 0.0000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
            <body name="L_Toe" pos="0.1182 0.0473 -0.058">
              <joint name="L_Toe_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="L_Toe_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="L_Toe_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <geom type="box" density="421.766439" pos="0.0256 -0.0065 0.0034" size="0.0495 0.0478 0.0205" quat="1.0000 0.0000 0.0000 0.0000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
            </body>
          </body>
        </body>
      </body>
      <body name="R_Hip" pos="-0.0213 -0.0633 -0.1039">
        <joint name="R_Hip_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="R_Hip_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="R_Hip_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="-0.0034 -0.0088 -0.0725 -0.0135 -0.0354 -0.2899" size="0.0598" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
        <body name="R_Knee" pos="-0.0168 -0.0442 -0.3624">
          <joint name="R_Knee_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="R_Knee_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="R_Knee_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <geom type="capsule" contype="1" conaffinity="1" density="1234.567901" fromto="-0.0040 0.0031 -0.0821 -0.0162 0.0123 -0.3286" size="0.0551" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
          <body name="R_Ankle" pos="-0.0202 0.0154 -0.4107">
            <joint name="R_Ankle_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="R_Ankle_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="R_Ankle_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="800" damping="80" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <geom type="box" density="445.807854" pos="0.0142 -0.0243 -0.0263" size="0.0857 0.0498 0.0464" quat="1.0000 0.0000 0.0000 0.0000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
            <body name="R_Toe" pos="0.119 -0.0388 -0.0583">
              <joint name="R_Toe_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="R_Toe_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="R_Toe_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <geom type="box" density="421.764462" pos="0.0158 0.0145 0.0062" size="0.0495 0.0478 0.0205" quat="1.0000 0.0000 0.0000 0.0000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
            </body>
          </body>
        </body>
      </body>
      <body name="Torso" pos="-0.0276 -0.0028 0.1099">
        <joint name="Torso_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="Torso_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <joint name="Torso_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
        <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="-0.0027 0.0043 0.0593 -0.0033 0.0052 0.0725" size="0.0719" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
        <body name="Spine" pos="-0.0059 0.0094 0.1319">
          <joint name="Spine_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="Spine_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <joint name="Spine_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
          <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="0.0128 -0.0051 0.0235 0.0156 -0.0062 0.0287" size="0.076" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
          <body name="Chest" pos="0.0284 -0.0113 0.0522">
            <joint name="Chest_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="Chest_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <joint name="Chest_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="1000" damping="100" armature="0.02" range="-180.0000 180.0000" limited="true" />
            <geom type="capsule" contype="1" conaffinity="1" density="2040.816327" fromto="-0.0078 -0.0020 0.0502 -0.0096 -0.0025 0.0613" size="0.1028" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
            <body name="Neck" pos="-0.0316 -0.0122 0.1652">
              <joint name="Neck_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="Neck_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="Neck_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0041 0.0050 0.0321 0.0166 0.0198 0.1284" size="0.0419" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
              <body name="Head" pos="0.0207 0.0248 0.1605">
                <joint name="Head_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="Head_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="Head_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <geom type="box" density="1018.531631" pos="-0.0008 -0.0111 0.0414" size="0.0797 0.0609 0.1096" quat="1.0000 0.0000 0.0000 0.0000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
              </body>
            </body>
            <body name="L_Thorax" pos="-0.0072 0.0464 0.0849">
              <joint name="L_Thorax_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="L_Thorax_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="L_Thorax_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0031 0.0238 0.0115 -0.0124 0.0954 0.0462" size="0.0488" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
              <body name="L_Shoulder" pos="-0.0155 0.1192 0.0577">
                <joint name="L_Shoulder_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="L_Shoulder_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="L_Shoulder_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0085 0.0508 -0.0144 -0.0340 0.2033 -0.0577" size="0.0522" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                <body name="L_Elbow" pos="-0.0425 0.2541 -0.0722">
                  <joint name="L_Elbow_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <joint name="L_Elbow_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <joint name="L_Elbow_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0005 0.0504 0.0046 -0.0020 0.2016 0.0186" size="0.0401" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                  <body name="L_Wrist" pos="-0.0025 0.252 0.0232">
                    <joint name="L_Wrist_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <joint name="L_Wrist_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <joint name="L_Wrist_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <geom type="box" density="1198.336433" pos="-0.0031 0.0523 -0.0013" size="0.04 0.0428 0.0159" quat="1.0000 0.0000 0.0000 0.0000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
                    <body name="L_Index1" pos="0.0194 0.1019 -0.0087">
                      <joint name="L_Index1_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-90 20" limited="true" />
                      <joint name="L_Index1_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                      <joint name="L_Index1_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-20 20" limited="true" />
                      <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0006 0.0064 0.0004 0.0024 0.0256 0.0018" size="0.0091" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                      <body name="L_Index2" pos="0.003 0.0319 0.0022">
                        <joint name="L_Index2_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-100 0" limited="true" />
                        <joint name="L_Index2_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="L_Index2_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0000 0.0045 -0.0005 0.0000 0.0180 -0.0019" size="0.0076" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        <body name="L_Index3" pos="0.0001 0.0225 -0.0024">
                          <joint name="L_Index3_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-80 0" limited="true" />
                          <joint name="L_Index3_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="L_Index3_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0004 0.0049 -0.0001 0.0016 0.0196 -0.0003" size="0.0064" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        </body>
                      </body>
                    </body>
                    <body name="L_Middle1" pos="-0.004 0.1094 -0.0063">
                      <joint name="L_Middle1_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-90 20" limited="true" />
                      <joint name="L_Middle1_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                      <joint name="L_Middle1_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-20 20" limited="true" />
                      <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0008 0.0061 0.0002 -0.0032 0.0245 0.0006" size="0.0094" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                      <body name="L_Middle2" pos="-0.004 0.0306 0.0008">
                        <joint name="L_Middle2_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-100 0" limited="true" />
                        <joint name="L_Middle2_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="L_Middle2_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0008 0.0047 -0.0004 -0.0033 0.0188 -0.0016" size="0.007" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        <body name="L_Middle3" pos="-0.0041 0.0235 -0.002">
                          <joint name="L_Middle3_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-80 0" limited="true" />
                          <joint name="L_Middle3_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="L_Middle3_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0004 0.0051 -0.0000 -0.0017 0.0204 -0.0000" size="0.0061" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        </body>
                      </body>
                    </body>
                    <body name="L_Pinky1" pos="-0.0437 0.084 -0.0145">
                      <joint name="L_Pinky1_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-90 20" limited="true" />
                      <joint name="L_Pinky1_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                      <joint name="L_Pinky1_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-20 20" limited="true" />
                      <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0024 0.0031 -0.0002 -0.0096 0.0124 -0.0009" size="0.0067" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                      <body name="L_Pinky2" pos="-0.012 0.0155 -0.0011">
                        <joint name="L_Pinky2_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-100 0" limited="true" />
                        <joint name="L_Pinky2_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="L_Pinky2_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0022 0.0031 -0.0003 -0.0090 0.0124 -0.0013" size="0.0065" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        <body name="L_Pinky3" pos="-0.0112 0.0155 -0.0017">
                          <joint name="L_Pinky3_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-80 0" limited="true" />
                          <joint name="L_Pinky3_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="L_Pinky3_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0018 0.0035 0.0001 -0.0074 0.0140 0.0003" size="0.005" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        </body>
                      </body>
                    </body>
                    <body name="L_Ring1" pos="-0.0273 0.0974 -0.0093">
                      <joint name="L_Ring1_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-90 20" limited="true" />
                      <joint name="L_Ring1_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                      <joint name="L_Ring1_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-20 20" limited="true" />
                      <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0011 0.0056 0.0003 -0.0042 0.0224 0.0012" size="0.008" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                      <body name="L_Ring2" pos="-0.0053 0.028 0.0015">
                        <joint name="L_Ring2_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-100 0" limited="true" />
                        <joint name="L_Ring2_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="L_Ring2_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0014 0.0046 -0.0003 -0.0057 0.0183 -0.0012" size="0.0074" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        <body name="L_Ring3" pos="-0.0071 0.0228 -0.0015">
                          <joint name="L_Ring3_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-80 0" limited="true" />
                          <joint name="L_Ring3_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="L_Ring3_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0010 0.0050 0.0001 -0.0041 0.0199 0.0004" size="0.0057" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        </body>
                      </body>
                    </body>
                    <body name="L_Thumb1" pos="0.0256 0.0406 -0.018">
                      <joint name="L_Thumb1_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-45 45" limited="true" />
                      <joint name="L_Thumb1_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-45 130" limited="true" />
                      <joint name="L_Thumb1_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-30 70" limited="true" />
                      <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0050 0.0034 0.0002 0.0200 0.0136 0.0008" size="0.012" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                      <body name="L_Thumb2" pos="0.025 0.017 0.001">
                        <joint name="L_Thumb2_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="L_Thumb2_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="L_Thumb2_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-20 55" limited="true" />
                        <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0031 0.0041 -0.0010 0.0124 0.0164 -0.0041" size="0.0095" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        <body name="L_Thumb3" pos="0.0155 0.0205 -0.0052">
                          <joint name="L_Thumb3_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="L_Thumb3_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="L_Thumb3_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-15 80" limited="true" />
                          <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0035 0.0045 -0.0006 0.0140 0.0180 -0.0025" size="0.0087" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        </body>
                      </body>
                    </body>
                  </body>
                </body>
              </body>
            </body>
            <body name="R_Thorax" pos="-0.0134 -0.0477 0.0843">
              <joint name="R_Thorax_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="R_Thorax_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <joint name="R_Thorax_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
              <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0025 -0.0205 0.0107 -0.0101 -0.0821 0.0428" size="0.0536" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
              <body name="R_Shoulder" pos="-0.0127 -0.1026 0.0535">
                <joint name="R_Shoulder_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="R_Shoulder_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <joint name="R_Shoulder_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0053 -0.0542 -0.0073 -0.0212 -0.2169 -0.0292" size="0.0521" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                <body name="R_Elbow" pos="-0.0265 -0.2711 -0.0365">
                  <joint name="R_Elbow_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <joint name="R_Elbow_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <joint name="R_Elbow_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="500" damping="50" armature="0.02" range="-180.0000 180.0000" limited="true" />
                  <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0031 -0.0499 -0.0009 -0.0123 -0.1994 -0.0036" size="0.0404" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                  <body name="R_Wrist" pos="-0.0153 -0.2493 -0.0045">
                    <joint name="R_Wrist_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <joint name="R_Wrist_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <joint name="R_Wrist_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="300" damping="30" armature="0.02" range="-180.0000 180.0000" limited="true" />
                    <geom type="box" density="1230.823712" pos="-0.0029 -0.0537 -0.0044" size="0.04 0.0402 0.0159" quat="1.0000 0.0000 0.0000 0.0000" conaffinity="1" condim="3" contype="7" margin="0.001" rgba="0.8 0.6 .4 1" />
                    <body name="R_Index1" pos="0.0196 -0.0999 -0.0118">
                      <joint name="R_Index1_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-20 90" limited="true" />
                      <joint name="R_Index1_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                      <joint name="R_Index1_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-20 20" limited="true" />
                      <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0006 -0.0064 0.0004 0.0024 -0.0256 0.0018" size="0.0091" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                      <body name="R_Index2" pos="0.003 -0.0319 0.0022">
                        <joint name="R_Index2_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="0 100" limited="true" />
                        <joint name="R_Index2_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="R_Index2_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0000 -0.0045 -0.0005 0.0000 -0.0180 -0.0019" size="0.0076" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        <body name="R_Index3" pos="0.0001 -0.0225 -0.0023">
                          <joint name="R_Index3_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="0 80" limited="true" />
                          <joint name="R_Index3_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="R_Index3_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0004 -0.0041 -0.0001 0.0016 -0.0164 -0.0003" size="0.0067" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        </body>
                      </body>
                    </body>
                    <body name="R_Middle1" pos="-0.0037 -0.1074 -0.0094">
                      <joint name="R_Middle1_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-20 90" limited="true" />
                      <joint name="R_Middle1_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                      <joint name="R_Middle1_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-20 20" limited="true" />
                      <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0008 -0.0061 0.0002 -0.0032 -0.0245 0.0006" size="0.0094" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                      <body name="R_Middle2" pos="-0.004 -0.0306 0.0008">
                        <joint name="R_Middle2_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="0 100" limited="true" />
                        <joint name="R_Middle2_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="R_Middle2_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0008 -0.0047 -0.0004 -0.0033 -0.0188 -0.0016" size="0.007" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        <body name="R_Middle3" pos="-0.0041 -0.0235 -0.002">
                          <joint name="R_Middle3_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="0 80" limited="true" />
                          <joint name="R_Middle3_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="R_Middle3_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0004 -0.0043 -0.0000 -0.0017 -0.0172 -0.0000" size="0.0064" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        </body>
                      </body>
                    </body>
                    <body name="R_Pinky1" pos="-0.0435 -0.082 -0.0176">
                      <joint name="R_Pinky1_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-20 90" limited="true" />
                      <joint name="R_Pinky1_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                      <joint name="R_Pinky1_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-20 20" limited="true" />
                      <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0024 -0.0031 -0.0002 -0.0096 -0.0124 -0.0009" size="0.0067" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                      <body name="R_Pinky2" pos="-0.012 -0.0155 -0.0011">
                        <joint name="R_Pinky2_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="0 100" limited="true" />
                        <joint name="R_Pinky2_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="R_Pinky2_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0022 -0.0031 -0.0003 -0.0090 -0.0124 -0.0013" size="0.0065" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        <body name="R_Pinky3" pos="-0.0112 -0.0155 -0.0017">
                          <joint name="R_Pinky3_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="0 80" limited="true" />
                          <joint name="R_Pinky3_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="R_Pinky3_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0018 -0.0027 0.0001 -0.0074 -0.0108 0.0003" size="0.0052" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        </body>
                      </body>
                    </body>
                    <body name="R_Ring1" pos="-0.0271 -0.0954 -0.0124">
                      <joint name="R_Ring1_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-20 90" limited="true" />
                      <joint name="R_Ring1_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                      <joint name="R_Ring1_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-20 20" limited="true" />
                      <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0011 -0.0056 0.0003 -0.0042 -0.0224 0.0012" size="0.008" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                      <body name="R_Ring2" pos="-0.0053 -0.028 0.0015">
                        <joint name="R_Ring2_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="0 100" limited="true" />
                        <joint name="R_Ring2_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="R_Ring2_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0014 -0.0046 -0.0003 -0.0057 -0.0183 -0.0012" size="0.0074" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        <body name="R_Ring3" pos="-0.0071 -0.0228 -0.0015">
                          <joint name="R_Ring3_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="0 80" limited="true" />
                          <joint name="R_Ring3_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="R_Ring3_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="-0.0010 -0.0042 0.0001 -0.0041 -0.0167 0.0004" size="0.006" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        </body>
                      </body>
                    </body>
                    <body name="R_Thumb1" pos="0.0259 -0.0386 -0.0211">
                      <joint name="R_Thumb1_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-45 45" limited="true" />
                      <joint name="R_Thumb1_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-45 130" limited="true" />
                      <joint name="R_Thumb1_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-70 30" limited="true" />
                      <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0050 -0.0034 0.0002 0.0200 -0.0136 0.0008" size="0.012" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                      <body name="R_Thumb2" pos="0.025 -0.017 0.001">
                        <joint name="R_Thumb2_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="R_Thumb2_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                        <joint name="R_Thumb2_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-55 20" limited="true" />
                        <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0031 -0.0041 -0.0010 0.0124 -0.0164 -0.0041" size="0.0095" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        <body name="R_Thumb3" pos="0.0155 -0.0205 -0.0052">
                          <joint name="R_Thumb3_x" type="hinge" pos="0 0 0" axis="1 0 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="R_Thumb3_y" type="hinge" pos="0 0 0" axis="0 1 0" stiffness="100" damping="10" armature="0.02" range="-0.1 0.1" limited="true" />
                          <joint name="R_Thumb3_z" type="hinge" pos="0 0 0" axis="0 0 1" stiffness="100" damping="10" armature="0.02" range="-80 15" limited="true" />
                          <geom type="capsule" contype="1" conaffinity="1" density="1000" fromto="0.0035 -0.0037 -0.0006 0.0140 -0.0148 -0.0025" size="0.009" condim="3" margin="0.001" rgba="0.8 0.6 .4 1" />
                        </body>
                      </body>
                    </body>
                  </body>
                </body>
              </body>
            </body>
          </body>
        </body>
      </body>
    <joint type="free" name="Pelvis" limited="false" actuatorfrclimited="false" /></body>
  </worldbody>
  <actuator>
    <motor name="L_Hip_x" joint="L_Hip_x" gear="500" />
    <motor name="L_Hip_y" joint="L_Hip_y" gear="500" />
    <motor name="L_Hip_z" joint="L_Hip_z" gear="500" />
    <motor name="L_Knee_x" joint="L_Knee_x" gear="500" />
    <motor name="L_Knee_y" joint="L_Knee_y" gear="500" />
    <motor name="L_Knee_z" joint="L_Knee_z" gear="500" />
    <motor name="L_Ankle_x" joint="L_Ankle_x" gear="500" />
    <motor name="L_Ankle_y" joint="L_Ankle_y" gear="500" />
    <motor name="L_Ankle_z" joint="L_Ankle_z" gear="500" />
    <motor name="L_Toe_x" joint="L_Toe_x" gear="500" />
    <motor name="L_Toe_y" joint="L_Toe_y" gear="500" />
    <motor name="L_Toe_z" joint="L_Toe_z" gear="500" />
    <motor name="R_Hip_x" joint="R_Hip_x" gear="500" />
    <motor name="R_Hip_y" joint="R_Hip_y" gear="500" />
    <motor name="R_Hip_z" joint="R_Hip_z" gear="500" />
    <motor name="R_Knee_x" joint="R_Knee_x" gear="500" />
    <motor name="R_Knee_y" joint="R_Knee_y" gear="500" />
    <motor name="R_Knee_z" joint="R_Knee_z" gear="500" />
    <motor name="R_Ankle_x" joint="R_Ankle_x" gear="500" />
    <motor name="R_Ankle_y" joint="R_Ankle_y" gear="500" />
    <motor name="R_Ankle_z" joint="R_Ankle_z" gear="500" />
    <motor name="R_Toe_x" joint="R_Toe_x" gear="500" />
    <motor name="R_Toe_y" joint="R_Toe_y" gear="500" />
    <motor name="R_Toe_z" joint="R_Toe_z" gear="500" />
    <motor name="Torso_x" joint="Torso_x" gear="500" />
    <motor name="Torso_y" joint="Torso_y" gear="500" />
    <motor name="Torso_z" joint="Torso_z" gear="500" />
    <motor name="Spine_x" joint="Spine_x" gear="500" />
    <motor name="Spine_y" joint="Spine_y" gear="500" />
    <motor name="Spine_z" joint="Spine_z" gear="500" />
    <motor name="Chest_x" joint="Chest_x" gear="500" />
    <motor name="Chest_y" joint="Chest_y" gear="500" />
    <motor name="Chest_z" joint="Chest_z" gear="500" />
    <motor name="Neck_x" joint="Neck_x" gear="500" />
    <motor name="Neck_y" joint="Neck_y" gear="500" />
    <motor name="Neck_z" joint="Neck_z" gear="500" />
    <motor name="Head_x" joint="Head_x" gear="500" />
    <motor name="Head_y" joint="Head_y" gear="500" />
    <motor name="Head_z" joint="Head_z" gear="500" />
    <motor name="L_Thorax_x" joint="L_Thorax_x" gear="500" />
    <motor name="L_Thorax_y" joint="L_Thorax_y" gear="500" />
    <motor name="L_Thorax_z" joint="L_Thorax_z" gear="500" />
    <motor name="L_Shoulder_x" joint="L_Shoulder_x" gear="500" />
    <motor name="L_Shoulder_y" joint="L_Shoulder_y" gear="500" />
    <motor name="L_Shoulder_z" joint="L_Shoulder_z" gear="500" />
    <motor name="L_Elbow_x" joint="L_Elbow_x" gear="500" />
    <motor name="L_Elbow_y" joint="L_Elbow_y" gear="500" />
    <motor name="L_Elbow_z" joint="L_Elbow_z" gear="500" />
    <motor name="L_Wrist_x" joint="L_Wrist_x" gear="500" />
    <motor name="L_Wrist_y" joint="L_Wrist_y" gear="500" />
    <motor name="L_Wrist_z" joint="L_Wrist_z" gear="500" />
    <motor name="L_Index1_x" joint="L_Index1_x" gear="500" />
    <motor name="L_Index1_y" joint="L_Index1_y" gear="500" />
    <motor name="L_Index1_z" joint="L_Index1_z" gear="500" />
    <motor name="L_Index2_x" joint="L_Index2_x" gear="500" />
    <motor name="L_Index2_y" joint="L_Index2_y" gear="500" />
    <motor name="L_Index2_z" joint="L_Index2_z" gear="500" />
    <motor name="L_Index3_x" joint="L_Index3_x" gear="500" />
    <motor name="L_Index3_y" joint="L_Index3_y" gear="500" />
    <motor name="L_Index3_z" joint="L_Index3_z" gear="500" />
    <motor name="L_Middle1_x" joint="L_Middle1_x" gear="500" />
    <motor name="L_Middle1_y" joint="L_Middle1_y" gear="500" />
    <motor name="L_Middle1_z" joint="L_Middle1_z" gear="500" />
    <motor name="L_Middle2_x" joint="L_Middle2_x" gear="500" />
    <motor name="L_Middle2_y" joint="L_Middle2_y" gear="500" />
    <motor name="L_Middle2_z" joint="L_Middle2_z" gear="500" />
    <motor name="L_Middle3_x" joint="L_Middle3_x" gear="500" />
    <motor name="L_Middle3_y" joint="L_Middle3_y" gear="500" />
    <motor name="L_Middle3_z" joint="L_Middle3_z" gear="500" />
    <motor name="L_Pinky1_x" joint="L_Pinky1_x" gear="500" />
    <motor name="L_Pinky1_y" joint="L_Pinky1_y" gear="500" />
    <motor name="L_Pinky1_z" joint="L_Pinky1_z" gear="500" />
    <motor name="L_Pinky2_x" joint="L_Pinky2_x" gear="500" />
    <motor name="L_Pinky2_y" joint="L_Pinky2_y" gear="500" />
    <motor name="L_Pinky2_z" joint="L_Pinky2_z" gear="500" />
    <motor name="L_Pinky3_x" joint="L_Pinky3_x" gear="500" />
    <motor name="L_Pinky3_y" joint="L_Pinky3_y" gear="500" />
    <motor name="L_Pinky3_z" joint="L_Pinky3_z" gear="500" />
    <motor name="L_Ring1_x" joint="L_Ring1_x" gear="500" />
    <motor name="L_Ring1_y" joint="L_Ring1_y" gear="500" />
    <motor name="L_Ring1_z" joint="L_Ring1_z" gear="500" />
    <motor name="L_Ring2_x" joint="L_Ring2_x" gear="500" />
    <motor name="L_Ring2_y" joint="L_Ring2_y" gear="500" />
    <motor name="L_Ring2_z" joint="L_Ring2_z" gear="500" />
    <motor name="L_Ring3_x" joint="L_Ring3_x" gear="500" />
    <motor name="L_Ring3_y" joint="L_Ring3_y" gear="500" />
    <motor name="L_Ring3_z" joint="L_Ring3_z" gear="500" />
    <motor name="L_Thumb1_x" joint="L_Thumb1_x" gear="500" />
    <motor name="L_Thumb1_y" joint="L_Thumb1_y" gear="500" />
    <motor name="L_Thumb1_z" joint="L_Thumb1_z" gear="500" />
    <motor name="L_Thumb2_x" joint="L_Thumb2_x" gear="500" />
    <motor name="L_Thumb2_y" joint="L_Thumb2_y" gear="500" />
    <motor name="L_Thumb2_z" joint="L_Thumb2_z" gear="500" />
    <motor name="L_Thumb3_x" joint="L_Thumb3_x" gear="500" />
    <motor name="L_Thumb3_y" joint="L_Thumb3_y" gear="500" />
    <motor name="L_Thumb3_z" joint="L_Thumb3_z" gear="500" />
    <motor name="R_Thorax_x" joint="R_Thorax_x" gear="500" />
    <motor name="R_Thorax_y" joint="R_Thorax_y" gear="500" />
    <motor name="R_Thorax_z" joint="R_Thorax_z" gear="500" />
    <motor name="R_Shoulder_x" joint="R_Shoulder_x" gear="500" />
    <motor name="R_Shoulder_y" joint="R_Shoulder_y" gear="500" />
    <motor name="R_Shoulder_z" joint="R_Shoulder_z" gear="500" />
    <motor name="R_Elbow_x" joint="R_Elbow_x" gear="500" />
    <motor name="R_Elbow_y" joint="R_Elbow_y" gear="500" />
    <motor name="R_Elbow_z" joint="R_Elbow_z" gear="500" />
    <motor name="R_Wrist_x" joint="R_Wrist_x" gear="500" />
    <motor name="R_Wrist_y" joint="R_Wrist_y" gear="500" />
    <motor name="R_Wrist_z" joint="R_Wrist_z" gear="500" />
    <motor name="R_Index1_x" joint="R_Index1_x" gear="500" />
    <motor name="R_Index1_y" joint="R_Index1_y" gear="500" />
    <motor name="R_Index1_z" joint="R_Index1_z" gear="500" />
    <motor name="R_Index2_x" joint="R_Index2_x" gear="500" />
    <motor name="R_Index2_y" joint="R_Index2_y" gear="500" />
    <motor name="R_Index2_z" joint="R_Index2_z" gear="500" />
    <motor name="R_Index3_x" joint="R_Index3_x" gear="500" />
    <motor name="R_Index3_y" joint="R_Index3_y" gear="500" />
    <motor name="R_Index3_z" joint="R_Index3_z" gear="500" />
    <motor name="R_Middle1_x" joint="R_Middle1_x" gear="500" />
    <motor name="R_Middle1_y" joint="R_Middle1_y" gear="500" />
    <motor name="R_Middle1_z" joint="R_Middle1_z" gear="500" />
    <motor name="R_Middle2_x" joint="R_Middle2_x" gear="500" />
    <motor name="R_Middle2_y" joint="R_Middle2_y" gear="500" />
    <motor name="R_Middle2_z" joint="R_Middle2_z" gear="500" />
    <motor name="R_Middle3_x" joint="R_Middle3_x" gear="500" />
    <motor name="R_Middle3_y" joint="R_Middle3_y" gear="500" />
    <motor name="R_Middle3_z" joint="R_Middle3_z" gear="500" />
    <motor name="R_Pinky1_x" joint="R_Pinky1_x" gear="500" />
    <motor name="R_Pinky1_y" joint="R_Pinky1_y" gear="500" />
    <motor name="R_Pinky1_z" joint="R_Pinky1_z" gear="500" />
    <motor name="R_Pinky2_x" joint="R_Pinky2_x" gear="500" />
    <motor name="R_Pinky2_y" joint="R_Pinky2_y" gear="500" />
    <motor name="R_Pinky2_z" joint="R_Pinky2_z" gear="500" />
    <motor name="R_Pinky3_x" joint="R_Pinky3_x" gear="500" />
    <motor name="R_Pinky3_y" joint="R_Pinky3_y" gear="500" />
    <motor name="R_Pinky3_z" joint="R_Pinky3_z" gear="500" />
    <motor name="R_Ring1_x" joint="R_Ring1_x" gear="500" />
    <motor name="R_Ring1_y" joint="R_Ring1_y" gear="500" />
    <motor name="R_Ring1_z" joint="R_Ring1_z" gear="500" />
    <motor name="R_Ring2_x" joint="R_Ring2_x" gear="500" />
    <motor name="R_Ring2_y" joint="R_Ring2_y" gear="500" />
    <motor name="R_Ring2_z" joint="R_Ring2_z" gear="500" />
    <motor name="R_Ring3_x" joint="R_Ring3_x" gear="500" />
    <motor name="R_Ring3_y" joint="R_Ring3_y" gear="500" />
    <motor name="R_Ring3_z" joint="R_Ring3_z" gear="500" />
    <motor name="R_Thumb1_x" joint="R_Thumb1_x" gear="500" />
    <motor name="R_Thumb1_y" joint="R_Thumb1_y" gear="500" />
    <motor name="R_Thumb1_z" joint="R_Thumb1_z" gear="500" />
    <motor name="R_Thumb2_x" joint="R_Thumb2_x" gear="500" />
    <motor name="R_Thumb2_y" joint="R_Thumb2_y" gear="500" />
    <motor name="R_Thumb2_z" joint="R_Thumb2_z" gear="500" />
    <motor name="R_Thumb3_x" joint="R_Thumb3_x" gear="500" />
    <motor name="R_Thumb3_y" joint="R_Thumb3_y" gear="500" />
    <motor name="R_Thumb3_z" joint="R_Thumb3_z" gear="500" />
  </actuator>
  <contact>
    <exclude body1="Torso" body2="Chest" />
    <exclude body1="Head" body2="Chest" />
    <exclude body1="R_Knee" body2="R_Toe" />
    <exclude body1="R_Knee" body2="L_Ankle" />
    <exclude body1="R_Knee" body2="L_Toe" />
    <exclude body1="L_Knee" body2="L_Toe" />
    <exclude body1="L_Knee" body2="R_Ankle" />
    <exclude body1="L_Knee" body2="R_Toe" />
    <exclude body1="L_Shoulder" body2="Chest" />
    <exclude body1="R_Shoulder" body2="Chest" />
  </contact>
  <sensor />
  <size njmax="700" nconmax="700" />
</mujoco>
```

##### Extracted Tables (smplx_humanoid.xml)
### Model File: `smplx_humanoid.xml`

#### 1a. Joint Definitions
| Joint Name | Type | Range (degrees) | Axis (x y z) | Armature | Damping | Stiffness | Parent Body |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pelvis | free | N/A | N/A | 0 | 0 | 0 | Pelvis |
| L_Hip_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | L_Hip |
| L_Hip_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | L_Hip |
| L_Hip_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | L_Hip |
| L_Knee_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | L_Knee |
| L_Knee_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | L_Knee |
| L_Knee_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | L_Knee |
| L_Ankle_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | L_Ankle |
| L_Ankle_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | L_Ankle |
| L_Ankle_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | L_Ankle |
| L_Toe_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | L_Toe |
| L_Toe_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | L_Toe |
| L_Toe_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | L_Toe |
| R_Hip_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | R_Hip |
| R_Hip_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | R_Hip |
| R_Hip_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | R_Hip |
| R_Knee_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | R_Knee |
| R_Knee_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | R_Knee |
| R_Knee_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | R_Knee |
| R_Ankle_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 80 | 800 | R_Ankle |
| R_Ankle_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 80 | 800 | R_Ankle |
| R_Ankle_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 80 | 800 | R_Ankle |
| R_Toe_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | R_Toe |
| R_Toe_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | R_Toe |
| R_Toe_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | R_Toe |
| Torso_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 100 | 1000 | Torso |
| Torso_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 100 | 1000 | Torso |
| Torso_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 100 | 1000 | Torso |
| Spine_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 100 | 1000 | Spine |
| Spine_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 100 | 1000 | Spine |
| Spine_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 100 | 1000 | Spine |
| Chest_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 100 | 1000 | Chest |
| Chest_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 100 | 1000 | Chest |
| Chest_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 100 | 1000 | Chest |
| Neck_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | Neck |
| Neck_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | Neck |
| Neck_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | Neck |
| Head_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | Head |
| Head_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | Head |
| Head_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | Head |
| L_Thorax_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | L_Thorax |
| L_Thorax_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | L_Thorax |
| L_Thorax_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | L_Thorax |
| L_Shoulder_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | L_Shoulder |
| L_Shoulder_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | L_Shoulder |
| L_Shoulder_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | L_Shoulder |
| L_Elbow_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | L_Elbow |
| L_Elbow_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | L_Elbow |
| L_Elbow_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | L_Elbow |
| L_Wrist_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 30 | 300 | L_Wrist |
| L_Wrist_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 30 | 300 | L_Wrist |
| L_Wrist_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 30 | 300 | L_Wrist |
| L_Index1_x | hinge | -90 20 | 1 0 0 | 0.02 | 10 | 100 | L_Index1 |
| L_Index1_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Index1 |
| L_Index1_z | hinge | -20 20 | 0 0 1 | 0.02 | 10 | 100 | L_Index1 |
| L_Index2_x | hinge | -100 0 | 1 0 0 | 0.02 | 10 | 100 | L_Index2 |
| L_Index2_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Index2 |
| L_Index2_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | L_Index2 |
| L_Index3_x | hinge | -80 0 | 1 0 0 | 0.02 | 10 | 100 | L_Index3 |
| L_Index3_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Index3 |
| L_Index3_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | L_Index3 |
| L_Middle1_x | hinge | -90 20 | 1 0 0 | 0.02 | 10 | 100 | L_Middle1 |
| L_Middle1_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Middle1 |
| L_Middle1_z | hinge | -20 20 | 0 0 1 | 0.02 | 10 | 100 | L_Middle1 |
| L_Middle2_x | hinge | -100 0 | 1 0 0 | 0.02 | 10 | 100 | L_Middle2 |
| L_Middle2_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Middle2 |
| L_Middle2_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | L_Middle2 |
| L_Middle3_x | hinge | -80 0 | 1 0 0 | 0.02 | 10 | 100 | L_Middle3 |
| L_Middle3_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Middle3 |
| L_Middle3_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | L_Middle3 |
| L_Pinky1_x | hinge | -90 20 | 1 0 0 | 0.02 | 10 | 100 | L_Pinky1 |
| L_Pinky1_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Pinky1 |
| L_Pinky1_z | hinge | -20 20 | 0 0 1 | 0.02 | 10 | 100 | L_Pinky1 |
| L_Pinky2_x | hinge | -100 0 | 1 0 0 | 0.02 | 10 | 100 | L_Pinky2 |
| L_Pinky2_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Pinky2 |
| L_Pinky2_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | L_Pinky2 |
| L_Pinky3_x | hinge | -80 0 | 1 0 0 | 0.02 | 10 | 100 | L_Pinky3 |
| L_Pinky3_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Pinky3 |
| L_Pinky3_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | L_Pinky3 |
| L_Ring1_x | hinge | -90 20 | 1 0 0 | 0.02 | 10 | 100 | L_Ring1 |
| L_Ring1_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Ring1 |
| L_Ring1_z | hinge | -20 20 | 0 0 1 | 0.02 | 10 | 100 | L_Ring1 |
| L_Ring2_x | hinge | -100 0 | 1 0 0 | 0.02 | 10 | 100 | L_Ring2 |
| L_Ring2_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Ring2 |
| L_Ring2_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | L_Ring2 |
| L_Ring3_x | hinge | -80 0 | 1 0 0 | 0.02 | 10 | 100 | L_Ring3 |
| L_Ring3_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Ring3 |
| L_Ring3_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | L_Ring3 |
| L_Thumb1_x | hinge | -45 45 | 1 0 0 | 0.02 | 10 | 100 | L_Thumb1 |
| L_Thumb1_y | hinge | -45 130 | 0 1 0 | 0.02 | 10 | 100 | L_Thumb1 |
| L_Thumb1_z | hinge | -30 70 | 0 0 1 | 0.02 | 10 | 100 | L_Thumb1 |
| L_Thumb2_x | hinge | -0.1 0.1 | 1 0 0 | 0.02 | 10 | 100 | L_Thumb2 |
| L_Thumb2_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Thumb2 |
| L_Thumb2_z | hinge | -20 55 | 0 0 1 | 0.02 | 10 | 100 | L_Thumb2 |
| L_Thumb3_x | hinge | -0.1 0.1 | 1 0 0 | 0.02 | 10 | 100 | L_Thumb3 |
| L_Thumb3_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | L_Thumb3 |
| L_Thumb3_z | hinge | -15 80 | 0 0 1 | 0.02 | 10 | 100 | L_Thumb3 |
| R_Thorax_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | R_Thorax |
| R_Thorax_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | R_Thorax |
| R_Thorax_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | R_Thorax |
| R_Shoulder_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | R_Shoulder |
| R_Shoulder_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | R_Shoulder |
| R_Shoulder_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | R_Shoulder |
| R_Elbow_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 50 | 500 | R_Elbow |
| R_Elbow_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 50 | 500 | R_Elbow |
| R_Elbow_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 50 | 500 | R_Elbow |
| R_Wrist_x | hinge | -180.0000 180.0000 | 1 0 0 | 0.02 | 30 | 300 | R_Wrist |
| R_Wrist_y | hinge | -180.0000 180.0000 | 0 1 0 | 0.02 | 30 | 300 | R_Wrist |
| R_Wrist_z | hinge | -180.0000 180.0000 | 0 0 1 | 0.02 | 30 | 300 | R_Wrist |
| R_Index1_x | hinge | -20 90 | 1 0 0 | 0.02 | 10 | 100 | R_Index1 |
| R_Index1_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Index1 |
| R_Index1_z | hinge | -20 20 | 0 0 1 | 0.02 | 10 | 100 | R_Index1 |
| R_Index2_x | hinge | 0 100 | 1 0 0 | 0.02 | 10 | 100 | R_Index2 |
| R_Index2_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Index2 |
| R_Index2_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | R_Index2 |
| R_Index3_x | hinge | 0 80 | 1 0 0 | 0.02 | 10 | 100 | R_Index3 |
| R_Index3_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Index3 |
| R_Index3_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | R_Index3 |
| R_Middle1_x | hinge | -20 90 | 1 0 0 | 0.02 | 10 | 100 | R_Middle1 |
| R_Middle1_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Middle1 |
| R_Middle1_z | hinge | -20 20 | 0 0 1 | 0.02 | 10 | 100 | R_Middle1 |
| R_Middle2_x | hinge | 0 100 | 1 0 0 | 0.02 | 10 | 100 | R_Middle2 |
| R_Middle2_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Middle2 |
| R_Middle2_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | R_Middle2 |
| R_Middle3_x | hinge | 0 80 | 1 0 0 | 0.02 | 10 | 100 | R_Middle3 |
| R_Middle3_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Middle3 |
| R_Middle3_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | R_Middle3 |
| R_Pinky1_x | hinge | -20 90 | 1 0 0 | 0.02 | 10 | 100 | R_Pinky1 |
| R_Pinky1_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Pinky1 |
| R_Pinky1_z | hinge | -20 20 | 0 0 1 | 0.02 | 10 | 100 | R_Pinky1 |
| R_Pinky2_x | hinge | 0 100 | 1 0 0 | 0.02 | 10 | 100 | R_Pinky2 |
| R_Pinky2_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Pinky2 |
| R_Pinky2_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | R_Pinky2 |
| R_Pinky3_x | hinge | 0 80 | 1 0 0 | 0.02 | 10 | 100 | R_Pinky3 |
| R_Pinky3_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Pinky3 |
| R_Pinky3_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | R_Pinky3 |
| R_Ring1_x | hinge | -20 90 | 1 0 0 | 0.02 | 10 | 100 | R_Ring1 |
| R_Ring1_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Ring1 |
| R_Ring1_z | hinge | -20 20 | 0 0 1 | 0.02 | 10 | 100 | R_Ring1 |
| R_Ring2_x | hinge | 0 100 | 1 0 0 | 0.02 | 10 | 100 | R_Ring2 |
| R_Ring2_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Ring2 |
| R_Ring2_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | R_Ring2 |
| R_Ring3_x | hinge | 0 80 | 1 0 0 | 0.02 | 10 | 100 | R_Ring3 |
| R_Ring3_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Ring3 |
| R_Ring3_z | hinge | -0.1 0.1 | 0 0 1 | 0.02 | 10 | 100 | R_Ring3 |
| R_Thumb1_x | hinge | -45 45 | 1 0 0 | 0.02 | 10 | 100 | R_Thumb1 |
| R_Thumb1_y | hinge | -45 130 | 0 1 0 | 0.02 | 10 | 100 | R_Thumb1 |
| R_Thumb1_z | hinge | -70 30 | 0 0 1 | 0.02 | 10 | 100 | R_Thumb1 |
| R_Thumb2_x | hinge | -0.1 0.1 | 1 0 0 | 0.02 | 10 | 100 | R_Thumb2 |
| R_Thumb2_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Thumb2 |
| R_Thumb2_z | hinge | -55 20 | 0 0 1 | 0.02 | 10 | 100 | R_Thumb2 |
| R_Thumb3_x | hinge | -0.1 0.1 | 1 0 0 | 0.02 | 10 | 100 | R_Thumb3 |
| R_Thumb3_y | hinge | -0.1 0.1 | 0 1 0 | 0.02 | 10 | 100 | R_Thumb3 |
| R_Thumb3_z | hinge | -80 15 | 0 0 1 | 0.02 | 10 | 100 | R_Thumb3 |

#### 1b. Body (Bone) Definitions
| Body Name | Parent Body | Position Offset (x y z) | Total Mass (kg) | Inertia Diagonal | Geoms (Type, Size, Mass) |
| --- | --- | --- | --- | --- | --- |
| Pelvis | worldbody | (0.0031, -0.3514, 0.0120) | 18.53747 | N/A (Auto-computed) | box (size=0.084 0.1079 0.0846, mass=18.53747kg) |
| L_Hip | Pelvis | (-0.0260, 0.0582, -0.0928) | 7.28204 | N/A (Auto-computed) | capsule (size=0.0605, mass=7.28204kg) |
| L_Knee | L_Hip | (-0.0094, 0.0547, -0.3788) | 3.47102 | N/A (Auto-computed) | capsule (size=0.0533, mass=3.47102kg) |
| L_Ankle | L_Knee | (-0.0319, -0.0435, -0.4031) | 0.70476 | N/A (Auto-computed) | box (size=0.0857 0.0498 0.0463, mass=0.70476kg) |
| L_Toe | L_Ankle | (0.1182, 0.0473, -0.0580) | 0.16366 | N/A (Auto-computed) | box (size=0.0495 0.0478 0.0205, mass=0.16366kg) |
| R_Hip | Pelvis | (-0.0213, -0.0633, -0.1039) | 6.85502 | N/A (Auto-computed) | capsule (size=0.0598, mass=6.85502kg) |
| R_Knee | R_Hip | (-0.0168, -0.0442, -0.3624) | 3.77324 | N/A (Auto-computed) | capsule (size=0.0551, mass=3.77324kg) |
| R_Ankle | R_Knee | (-0.0202, 0.0154, -0.4107) | 0.70626 | N/A (Auto-computed) | box (size=0.0857 0.0498 0.0464, mass=0.70626kg) |
| R_Toe | R_Ankle | (0.1190, -0.0388, -0.0583) | 0.16366 | N/A (Auto-computed) | box (size=0.0495 0.0478 0.0205, mass=0.16366kg) |
| Torso | Pelvis | (-0.0276, -0.0028, 0.1099) | 3.61643 | N/A (Auto-computed) | capsule (size=0.0719, mass=3.61643kg) |
| Spine | Torso | (-0.0059, 0.0094, 0.1319) | 3.97508 | N/A (Auto-computed) | capsule (size=0.076, mass=3.97508kg) |
| Chest | Spine | (0.0284, -0.0113, 0.0522) | 10.04958 | N/A (Auto-computed) | capsule (size=0.1028, mass=10.04958kg) |
| Neck | Chest | (-0.0316, -0.0122, 0.1652) | 0.84990 | N/A (Auto-computed) | capsule (size=0.0419, mass=0.84990kg) |
| Head | Neck | (0.0207, 0.0248, 0.1605) | 4.33462 | N/A (Auto-computed) | box (size=0.0797 0.0609 0.1096, mass=4.33462kg) |
| L_Thorax | Chest | (-0.0072, 0.0464, 0.0849) | 1.08612 | N/A (Auto-computed) | capsule (size=0.0488, mass=1.08612kg) |
| L_Shoulder | L_Thorax | (-0.0155, 0.1192, 0.0577) | 1.97030 | N/A (Auto-computed) | capsule (size=0.0522, mass=1.97030kg) |
| L_Elbow | L_Shoulder | (-0.0425, 0.2541, -0.0722) | 1.03722 | N/A (Auto-computed) | capsule (size=0.0401, mass=1.03722kg) |
| L_Wrist | L_Elbow | (-0.0025, 0.2520, 0.0232) | 0.26096 | N/A (Auto-computed) | box (size=0.04 0.0428 0.0159, mass=0.26096kg) |
| L_Index1 | L_Wrist | (0.0194, 0.1019, -0.0087) | 0.00819 | N/A (Auto-computed) | capsule (size=0.0091, mass=0.00819kg) |
| L_Index2 | L_Index1 | (0.0030, 0.0319, 0.0022) | 0.00430 | N/A (Auto-computed) | capsule (size=0.0076, mass=0.00430kg) |
| L_Index3 | L_Index2 | (0.0001, 0.0225, -0.0024) | 0.00300 | N/A (Auto-computed) | capsule (size=0.0064, mass=0.00300kg) |
| L_Middle1 | L_Wrist | (-0.0040, 0.1094, -0.0063) | 0.00863 | N/A (Auto-computed) | capsule (size=0.0094, mass=0.00863kg) |
| L_Middle2 | L_Middle1 | (-0.0040, 0.0306, 0.0008) | 0.00365 | N/A (Auto-computed) | capsule (size=0.007, mass=0.00365kg) |
| L_Middle3 | L_Middle2 | (-0.0041, 0.0235, -0.0020) | 0.00275 | N/A (Auto-computed) | capsule (size=0.0061, mass=0.00275kg) |
| L_Pinky1 | L_Wrist | (-0.0437, 0.0840, -0.0145) | 0.00292 | N/A (Auto-computed) | capsule (size=0.0067, mass=0.00292kg) |
| L_Pinky2 | L_Pinky1 | (-0.0120, 0.0155, -0.0011) | 0.00269 | N/A (Auto-computed) | capsule (size=0.0065, mass=0.00269kg) |
| L_Pinky3 | L_Pinky2 | (-0.0112, 0.0155, -0.0017) | 0.00146 | N/A (Auto-computed) | capsule (size=0.005, mass=0.00146kg) |
| L_Ring1 | L_Wrist | (-0.0273, 0.0974, -0.0093) | 0.00558 | N/A (Auto-computed) | capsule (size=0.008, mass=0.00558kg) |
| L_Ring2 | L_Ring1 | (-0.0053, 0.0280, 0.0015) | 0.00417 | N/A (Auto-computed) | capsule (size=0.0074, mass=0.00417kg) |
| L_Ring3 | L_Ring2 | (-0.0071, 0.0228, -0.0015) | 0.00233 | N/A (Auto-computed) | capsule (size=0.0057, mass=0.00233kg) |
| L_Thumb1 | L_Wrist | (0.0256, 0.0406, -0.0180) | 0.01545 | N/A (Auto-computed) | capsule (size=0.012, mass=0.01545kg) |
| L_Thumb2 | L_Thumb1 | (0.0250, 0.0170, 0.0010) | 0.00805 | N/A (Auto-computed) | capsule (size=0.0095, mass=0.00805kg) |
| L_Thumb3 | L_Thumb2 | (0.0155, 0.0205, -0.0052) | 0.00685 | N/A (Auto-computed) | capsule (size=0.0087, mass=0.00685kg) |
| R_Thorax | Chest | (-0.0134, -0.0477, 0.0843) | 1.27572 | N/A (Auto-computed) | capsule (size=0.0536, mass=1.27572kg) |
| R_Shoulder | R_Thorax | (-0.0127, -0.1026, 0.0535) | 1.99888 | N/A (Auto-computed) | capsule (size=0.0521, mass=1.99888kg) |
| R_Elbow | R_Shoulder | (-0.0265, -0.2711, -0.0365) | 1.04435 | N/A (Auto-computed) | capsule (size=0.0404, mass=1.04435kg) |
| R_Wrist | R_Elbow | (-0.0153, -0.2493, -0.0045) | 0.25175 | N/A (Auto-computed) | box (size=0.04 0.0402 0.0159, mass=0.25175kg) |
| R_Index1 | R_Wrist | (0.0196, -0.0999, -0.0118) | 0.00819 | N/A (Auto-computed) | capsule (size=0.0091, mass=0.00819kg) |
| R_Index2 | R_Index1 | (0.0030, -0.0319, 0.0022) | 0.00430 | N/A (Auto-computed) | capsule (size=0.0076, mass=0.00430kg) |
| R_Index3 | R_Index2 | (0.0001, -0.0225, -0.0023) | 0.00300 | N/A (Auto-computed) | capsule (size=0.0067, mass=0.00300kg) |
| R_Middle1 | R_Wrist | (-0.0037, -0.1074, -0.0094) | 0.00863 | N/A (Auto-computed) | capsule (size=0.0094, mass=0.00863kg) |
| R_Middle2 | R_Middle1 | (-0.0040, -0.0306, 0.0008) | 0.00365 | N/A (Auto-computed) | capsule (size=0.007, mass=0.00365kg) |
| R_Middle3 | R_Middle2 | (-0.0041, -0.0235, -0.0020) | 0.00277 | N/A (Auto-computed) | capsule (size=0.0064, mass=0.00277kg) |
| R_Pinky1 | R_Wrist | (-0.0435, -0.0820, -0.0176) | 0.00292 | N/A (Auto-computed) | capsule (size=0.0067, mass=0.00292kg) |
| R_Pinky2 | R_Pinky1 | (-0.0120, -0.0155, -0.0011) | 0.00269 | N/A (Auto-computed) | capsule (size=0.0065, mass=0.00269kg) |
| R_Pinky3 | R_Pinky2 | (-0.0112, -0.0155, -0.0017) | 0.00143 | N/A (Auto-computed) | capsule (size=0.0052, mass=0.00143kg) |
| R_Ring1 | R_Wrist | (-0.0271, -0.0954, -0.0124) | 0.00558 | N/A (Auto-computed) | capsule (size=0.008, mass=0.00558kg) |
| R_Ring2 | R_Ring1 | (-0.0053, -0.0280, 0.0015) | 0.00417 | N/A (Auto-computed) | capsule (size=0.0074, mass=0.00417kg) |
| R_Ring3 | R_Ring2 | (-0.0071, -0.0228, -0.0015) | 0.00236 | N/A (Auto-computed) | capsule (size=0.006, mass=0.00236kg) |
| R_Thumb1 | R_Wrist | (0.0259, -0.0386, -0.0211) | 0.01545 | N/A (Auto-computed) | capsule (size=0.012, mass=0.01545kg) |
| R_Thumb2 | R_Thumb1 | (0.0250, -0.0170, 0.0010) | 0.00805 | N/A (Auto-computed) | capsule (size=0.0095, mass=0.00805kg) |
| R_Thumb3 | R_Thumb2 | (0.0155, -0.0205, -0.0052) | 0.00697 | N/A (Auto-computed) | capsule (size=0.009, mass=0.00697kg) |

#### 1c. Actuator Definitions
| Actuator Name | Joint Controlled | Gear Ratio / Scale | Ctrl Range | Force Limit |
| --- | --- | --- | --- | --- |
| L_Hip_x | L_Hip_x | 500 | N/A | N/A |
| L_Hip_y | L_Hip_y | 500 | N/A | N/A |
| L_Hip_z | L_Hip_z | 500 | N/A | N/A |
| L_Knee_x | L_Knee_x | 500 | N/A | N/A |
| L_Knee_y | L_Knee_y | 500 | N/A | N/A |
| L_Knee_z | L_Knee_z | 500 | N/A | N/A |
| L_Ankle_x | L_Ankle_x | 500 | N/A | N/A |
| L_Ankle_y | L_Ankle_y | 500 | N/A | N/A |
| L_Ankle_z | L_Ankle_z | 500 | N/A | N/A |
| L_Toe_x | L_Toe_x | 500 | N/A | N/A |
| L_Toe_y | L_Toe_y | 500 | N/A | N/A |
| L_Toe_z | L_Toe_z | 500 | N/A | N/A |
| R_Hip_x | R_Hip_x | 500 | N/A | N/A |
| R_Hip_y | R_Hip_y | 500 | N/A | N/A |
| R_Hip_z | R_Hip_z | 500 | N/A | N/A |
| R_Knee_x | R_Knee_x | 500 | N/A | N/A |
| R_Knee_y | R_Knee_y | 500 | N/A | N/A |
| R_Knee_z | R_Knee_z | 500 | N/A | N/A |
| R_Ankle_x | R_Ankle_x | 500 | N/A | N/A |
| R_Ankle_y | R_Ankle_y | 500 | N/A | N/A |
| R_Ankle_z | R_Ankle_z | 500 | N/A | N/A |
| R_Toe_x | R_Toe_x | 500 | N/A | N/A |
| R_Toe_y | R_Toe_y | 500 | N/A | N/A |
| R_Toe_z | R_Toe_z | 500 | N/A | N/A |
| Torso_x | Torso_x | 500 | N/A | N/A |
| Torso_y | Torso_y | 500 | N/A | N/A |
| Torso_z | Torso_z | 500 | N/A | N/A |
| Spine_x | Spine_x | 500 | N/A | N/A |
| Spine_y | Spine_y | 500 | N/A | N/A |
| Spine_z | Spine_z | 500 | N/A | N/A |
| Chest_x | Chest_x | 500 | N/A | N/A |
| Chest_y | Chest_y | 500 | N/A | N/A |
| Chest_z | Chest_z | 500 | N/A | N/A |
| Neck_x | Neck_x | 500 | N/A | N/A |
| Neck_y | Neck_y | 500 | N/A | N/A |
| Neck_z | Neck_z | 500 | N/A | N/A |
| Head_x | Head_x | 500 | N/A | N/A |
| Head_y | Head_y | 500 | N/A | N/A |
| Head_z | Head_z | 500 | N/A | N/A |
| L_Thorax_x | L_Thorax_x | 500 | N/A | N/A |
| L_Thorax_y | L_Thorax_y | 500 | N/A | N/A |
| L_Thorax_z | L_Thorax_z | 500 | N/A | N/A |
| L_Shoulder_x | L_Shoulder_x | 500 | N/A | N/A |
| L_Shoulder_y | L_Shoulder_y | 500 | N/A | N/A |
| L_Shoulder_z | L_Shoulder_z | 500 | N/A | N/A |
| L_Elbow_x | L_Elbow_x | 500 | N/A | N/A |
| L_Elbow_y | L_Elbow_y | 500 | N/A | N/A |
| L_Elbow_z | L_Elbow_z | 500 | N/A | N/A |
| L_Wrist_x | L_Wrist_x | 500 | N/A | N/A |
| L_Wrist_y | L_Wrist_y | 500 | N/A | N/A |
| L_Wrist_z | L_Wrist_z | 500 | N/A | N/A |
| L_Index1_x | L_Index1_x | 500 | N/A | N/A |
| L_Index1_y | L_Index1_y | 500 | N/A | N/A |
| L_Index1_z | L_Index1_z | 500 | N/A | N/A |
| L_Index2_x | L_Index2_x | 500 | N/A | N/A |
| L_Index2_y | L_Index2_y | 500 | N/A | N/A |
| L_Index2_z | L_Index2_z | 500 | N/A | N/A |
| L_Index3_x | L_Index3_x | 500 | N/A | N/A |
| L_Index3_y | L_Index3_y | 500 | N/A | N/A |
| L_Index3_z | L_Index3_z | 500 | N/A | N/A |
| L_Middle1_x | L_Middle1_x | 500 | N/A | N/A |
| L_Middle1_y | L_Middle1_y | 500 | N/A | N/A |
| L_Middle1_z | L_Middle1_z | 500 | N/A | N/A |
| L_Middle2_x | L_Middle2_x | 500 | N/A | N/A |
| L_Middle2_y | L_Middle2_y | 500 | N/A | N/A |
| L_Middle2_z | L_Middle2_z | 500 | N/A | N/A |
| L_Middle3_x | L_Middle3_x | 500 | N/A | N/A |
| L_Middle3_y | L_Middle3_y | 500 | N/A | N/A |
| L_Middle3_z | L_Middle3_z | 500 | N/A | N/A |
| L_Pinky1_x | L_Pinky1_x | 500 | N/A | N/A |
| L_Pinky1_y | L_Pinky1_y | 500 | N/A | N/A |
| L_Pinky1_z | L_Pinky1_z | 500 | N/A | N/A |
| L_Pinky2_x | L_Pinky2_x | 500 | N/A | N/A |
| L_Pinky2_y | L_Pinky2_y | 500 | N/A | N/A |
| L_Pinky2_z | L_Pinky2_z | 500 | N/A | N/A |
| L_Pinky3_x | L_Pinky3_x | 500 | N/A | N/A |
| L_Pinky3_y | L_Pinky3_y | 500 | N/A | N/A |
| L_Pinky3_z | L_Pinky3_z | 500 | N/A | N/A |
| L_Ring1_x | L_Ring1_x | 500 | N/A | N/A |
| L_Ring1_y | L_Ring1_y | 500 | N/A | N/A |
| L_Ring1_z | L_Ring1_z | 500 | N/A | N/A |
| L_Ring2_x | L_Ring2_x | 500 | N/A | N/A |
| L_Ring2_y | L_Ring2_y | 500 | N/A | N/A |
| L_Ring2_z | L_Ring2_z | 500 | N/A | N/A |
| L_Ring3_x | L_Ring3_x | 500 | N/A | N/A |
| L_Ring3_y | L_Ring3_y | 500 | N/A | N/A |
| L_Ring3_z | L_Ring3_z | 500 | N/A | N/A |
| L_Thumb1_x | L_Thumb1_x | 500 | N/A | N/A |
| L_Thumb1_y | L_Thumb1_y | 500 | N/A | N/A |
| L_Thumb1_z | L_Thumb1_z | 500 | N/A | N/A |
| L_Thumb2_x | L_Thumb2_x | 500 | N/A | N/A |
| L_Thumb2_y | L_Thumb2_y | 500 | N/A | N/A |
| L_Thumb2_z | L_Thumb2_z | 500 | N/A | N/A |
| L_Thumb3_x | L_Thumb3_x | 500 | N/A | N/A |
| L_Thumb3_y | L_Thumb3_y | 500 | N/A | N/A |
| L_Thumb3_z | L_Thumb3_z | 500 | N/A | N/A |
| R_Thorax_x | R_Thorax_x | 500 | N/A | N/A |
| R_Thorax_y | R_Thorax_y | 500 | N/A | N/A |
| R_Thorax_z | R_Thorax_z | 500 | N/A | N/A |
| R_Shoulder_x | R_Shoulder_x | 500 | N/A | N/A |
| R_Shoulder_y | R_Shoulder_y | 500 | N/A | N/A |
| R_Shoulder_z | R_Shoulder_z | 500 | N/A | N/A |
| R_Elbow_x | R_Elbow_x | 500 | N/A | N/A |
| R_Elbow_y | R_Elbow_y | 500 | N/A | N/A |
| R_Elbow_z | R_Elbow_z | 500 | N/A | N/A |
| R_Wrist_x | R_Wrist_x | 500 | N/A | N/A |
| R_Wrist_y | R_Wrist_y | 500 | N/A | N/A |
| R_Wrist_z | R_Wrist_z | 500 | N/A | N/A |
| R_Index1_x | R_Index1_x | 500 | N/A | N/A |
| R_Index1_y | R_Index1_y | 500 | N/A | N/A |
| R_Index1_z | R_Index1_z | 500 | N/A | N/A |
| R_Index2_x | R_Index2_x | 500 | N/A | N/A |
| R_Index2_y | R_Index2_y | 500 | N/A | N/A |
| R_Index2_z | R_Index2_z | 500 | N/A | N/A |
| R_Index3_x | R_Index3_x | 500 | N/A | N/A |
| R_Index3_y | R_Index3_y | 500 | N/A | N/A |
| R_Index3_z | R_Index3_z | 500 | N/A | N/A |
| R_Middle1_x | R_Middle1_x | 500 | N/A | N/A |
| R_Middle1_y | R_Middle1_y | 500 | N/A | N/A |
| R_Middle1_z | R_Middle1_z | 500 | N/A | N/A |
| R_Middle2_x | R_Middle2_x | 500 | N/A | N/A |
| R_Middle2_y | R_Middle2_y | 500 | N/A | N/A |
| R_Middle2_z | R_Middle2_z | 500 | N/A | N/A |
| R_Middle3_x | R_Middle3_x | 500 | N/A | N/A |
| R_Middle3_y | R_Middle3_y | 500 | N/A | N/A |
| R_Middle3_z | R_Middle3_z | 500 | N/A | N/A |
| R_Pinky1_x | R_Pinky1_x | 500 | N/A | N/A |
| R_Pinky1_y | R_Pinky1_y | 500 | N/A | N/A |
| R_Pinky1_z | R_Pinky1_z | 500 | N/A | N/A |
| R_Pinky2_x | R_Pinky2_x | 500 | N/A | N/A |
| R_Pinky2_y | R_Pinky2_y | 500 | N/A | N/A |
| R_Pinky2_z | R_Pinky2_z | 500 | N/A | N/A |
| R_Pinky3_x | R_Pinky3_x | 500 | N/A | N/A |
| R_Pinky3_y | R_Pinky3_y | 500 | N/A | N/A |
| R_Pinky3_z | R_Pinky3_z | 500 | N/A | N/A |
| R_Ring1_x | R_Ring1_x | 500 | N/A | N/A |
| R_Ring1_y | R_Ring1_y | 500 | N/A | N/A |
| R_Ring1_z | R_Ring1_z | 500 | N/A | N/A |
| R_Ring2_x | R_Ring2_x | 500 | N/A | N/A |
| R_Ring2_y | R_Ring2_y | 500 | N/A | N/A |
| R_Ring2_z | R_Ring2_z | 500 | N/A | N/A |
| R_Ring3_x | R_Ring3_x | 500 | N/A | N/A |
| R_Ring3_y | R_Ring3_y | 500 | N/A | N/A |
| R_Ring3_z | R_Ring3_z | 500 | N/A | N/A |
| R_Thumb1_x | R_Thumb1_x | 500 | N/A | N/A |
| R_Thumb1_y | R_Thumb1_y | 500 | N/A | N/A |
| R_Thumb1_z | R_Thumb1_z | 500 | N/A | N/A |
| R_Thumb2_x | R_Thumb2_x | 500 | N/A | N/A |
| R_Thumb2_y | R_Thumb2_y | 500 | N/A | N/A |
| R_Thumb2_z | R_Thumb2_z | 500 | N/A | N/A |
| R_Thumb3_x | R_Thumb3_x | 500 | N/A | N/A |
| R_Thumb3_y | R_Thumb3_y | 500 | N/A | N/A |
| R_Thumb3_z | R_Thumb3_z | 500 | N/A | N/A |


---

=== TASK 2: PD GAINS ===

#### File: `protomotions/robot_configs/smpl.py` (SMPL Humanoid PD gain mappings)
```python
control: ControlConfig = field(
        default_factory=lambda: ControlConfig(
            control_type=ControlType.BUILT_IN_PD,
            override_control_info={
                ".*_(Hip|Knee|Ankle)_.*": ControlInfo(
                    stiffness=800,
                    damping=80,
                    effort_limit=500,
                    velocity_limit=100,
                ),
                ".*_Toe_.*": ControlInfo(
                    stiffness=500,
                    damping=50,
                    effort_limit=500,
                    velocity_limit=100,
                ),
                "(Torso|Spine|Chest)_.*": ControlInfo(
                    stiffness=1000,
                    damping=100,
                    effort_limit=500,
                    velocity_limit=100,
                ),
                "(Neck|Head|.*_Thorax|.*_Shoulder|.*_Elbow)_.*": ControlInfo(
                    stiffness=500,
                    damping=50,
                    effort_limit=500,
                    velocity_limit=100,
                ),
                ".*_(Wrist|Hand)_.*": ControlInfo(
                    stiffness=300,
                    damping=30,
                    effort_limit=500,
                    velocity_limit=100,
                ),
            },
        )
    )
```

#### File: `protomotions/robot_configs/smplx.py` (SMPL-X Humanoid PD gain mappings with finger joint limits)
```python
control: ControlConfig = field(
        default_factory=lambda: ControlConfig(
            control_type=ControlType.BUILT_IN_PD,
            override_control_info={
                ".*_(Hip|Knee|Ankle)_.*": ControlInfo(
                    stiffness=800, damping=80, effort_limit=500, velocity_limit=100
                ),
                ".*_Toe_.*": ControlInfo(
                    stiffness=500, damping=50, effort_limit=500, velocity_limit=100
                ),
                "(Torso|Spine|Chest)_.*": ControlInfo(
                    stiffness=1000, damping=100, effort_limit=500, velocity_limit=100
                ),
                "(Neck|Head|.*_Thorax|.*_Shoulder)_.*": ControlInfo(
                    stiffness=500, damping=50, effort_limit=500, velocity_limit=100
                ),
                ".*_(Elbow|Wrist)_.*": ControlInfo(
                    stiffness=300, damping=30, effort_limit=300, velocity_limit=100
                ),
                ".*_(Index|Middle|Pinky|Ring|Thumb)[123]_[xyz]": ControlInfo(
                    stiffness=10, damping=1, effort_limit=10, velocity_limit=5
                ),
            },
        )
    )
```

---

=== TASK 3: BODY PROPORTIONS ===

Below is the detailed table of segment lengths and mass properties computed directly from `smpl_humanoid.xml` using physical geometry formulas (boxes and capsules) and their respective material densities:

| Body Name | Parent Name | Offset from Parent (x, y, z) | Segment Length (meters) | Geom Type | Geom Size | Approximate Mass (kg) | Mass Fraction (%) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pelvis | worldbody | (-0.0018, -0.2233, 0.0282) | 0.2251m | box | 0.083 0.1069 0.0722 | 5.12487 | 8.09% |
| L_Hip | Pelvis | (-0.0068, 0.0695, -0.0914) | 0.1150m | capsule | 0.0615 | 7.47244 | 11.80% |
| L_Knee | L_Hip | (-0.0045, 0.0343, -0.3752) | 0.3768m | capsule | 0.0541 | 3.54759 | 5.60% |
| L_Ankle | L_Knee | (-0.0437, -0.0136, -0.3980) | 0.4006m | box | 0.085 0.0483 0.0464 | 1.52396 | 2.41% |
| L_Toe | L_Ankle | (0.1193, 0.0264, -0.0558) | 0.1343m | box | 0.0496 0.0478 0.02 | 0.37934 | 0.60% |
| R_Hip | Pelvis | (-0.0043, -0.0677, -0.0905) | 0.1131m | capsule | 0.0606 | 7.33663 | 11.59% |
| R_Knee | R_Hip | (-0.0089, -0.0383, -0.3826) | 0.3846m | capsule | 0.0541 | 3.54912 | 5.61% |
| R_Ankle | R_Knee | (-0.0423, 0.0158, -0.3984) | 0.4010m | box | 0.0865 0.0483 0.0478 | 1.59765 | 2.52% |
| R_Toe | R_Ankle | (0.1233, -0.0254, -0.0481) | 0.1348m | box | 0.0493 0.0479 0.0216 | 0.40806 | 0.64% |
| Torso | Pelvis | (-0.0267, -0.0025, 0.1090) | 0.1123m | capsule | 0.0769 | 4.39972 | 6.95% |
| Spine | Torso | (0.0011, 0.0055, 0.1352) | 0.1353m | capsule | 0.0755 | 3.89481 | 6.15% |
| Chest | Spine | (0.0254, 0.0015, 0.0529) | 0.0587m | capsule | 0.1002 | 9.60386 | 15.17% |
| Neck | Chest | (-0.0429, -0.0028, 0.2139) | 0.2182m | capsule | 0.0436 | 0.64454 | 1.02% |
| Head | Neck | (0.0513, 0.0052, 0.0650) | 0.0830m | box | 0.076 0.0606 0.1154 | 4.25189 | 6.72% |
| L_Thorax | Chest | (-0.0341, 0.0788, 0.1217) | 0.1489m | capsule | 0.0521 | 1.08552 | 1.71% |
| L_Shoulder | L_Thorax | (-0.0089, 0.0910, 0.0305) | 0.0964m | capsule | 0.0517 | 1.89598 | 2.99% |
| L_Elbow | L_Shoulder | (-0.0275, 0.2596, -0.0128) | 0.2614m | capsule | 0.0405 | 1.04966 | 1.66% |
| L_Wrist | L_Elbow | (-0.0012, 0.2492, 0.0090) | 0.2494m | capsule | 0.0318 | 0.29809 | 0.47% |
| L_Hand | L_Wrist | (-0.0149, 0.0840, -0.0082) | 0.0857m | box | 0.0538 0.0585 0.0158 | 0.39782 | 0.63% |
| R_Thorax | Chest | (-0.0386, -0.0818, 0.1188) | 0.1493m | capsule | 0.0511 | 1.05981 | 1.67% |
| R_Shoulder | R_Thorax | (-0.0091, -0.0960, 0.0326) | 0.1018m | capsule | 0.0531 | 1.98284 | 3.13% |
| R_Elbow | R_Shoulder | (-0.0214, -0.2537, -0.0133) | 0.2549m | capsule | 0.0408 | 1.08569 | 1.71% |
| R_Wrist | R_Elbow | (-0.0056, -0.2553, 0.0078) | 0.2555m | capsule | 0.0326 | 0.31644 | 0.50% |
| R_Hand | R_Wrist | (-0.0103, -0.0846, -0.0061) | 0.0854m | box | 0.0546 0.0569 0.0164 | 0.40760 | 0.64% |

Total Calculated Body Mass: 63.31395 kg

---

=== TASK 4: DOF ORDER ===

#### File: `data/smpl/smpl_joint_names.py` (Canonical Joint & Bone Order Lists)
```python
SMPL_BONE_ORDER_NAMES = [
    "Pelvis",
    "L_Hip",
    "R_Hip",
    "Torso",
    "L_Knee",
    "R_Knee",
    "Spine",
    "L_Ankle",
    "R_Ankle",
    "Chest",
    "L_Toe",
    "R_Toe",
    "Neck",
    "L_Thorax",
    "R_Thorax",
    "Head",
    "L_Shoulder",
    "R_Shoulder",
    "L_Elbow",
    "R_Elbow",
    "L_Wrist",
    "R_Wrist",
    "L_Hand",
    "R_Hand",
]

SMPL_MUJOCO_NAMES = [
    "Pelvis",
    "L_Hip",
    "L_Knee",
    "L_Ankle",
    "L_Toe",
    "R_Hip",
    "R_Knee",
    "R_Ankle",
    "R_Toe",
    "Torso",
    "Spine",
    "Chest",
    "Neck",
    "Head",
    "L_Thorax",
    "L_Shoulder",
    "L_Elbow",
    "L_Wrist",
    "L_Hand",
    "R_Thorax",
    "R_Shoulder",
    "R_Elbow",
    "R_Wrist",
    "R_Hand",
]
```

#### File: `protomotions/robot_configs/smpl.py` (Canonical Flat RL Training DOF Order List)
```python
dof_names = ['L_Hip_x', 'L_Hip_y', 'L_Hip_z', 'L_Knee_x', 'L_Knee_y', 'L_Knee_z', 'L_Ankle_x', 'L_Ankle_y', 'L_Ankle_z', 'L_Toe_x', 'L_Toe_y', 'L_Toe_z', 'R_Hip_x', 'R_Hip_y', 'R_Hip_z', 'R_Knee_x', 'R_Knee_y', 'R_Knee_z', 'R_Ankle_x', 'R_Ankle_y', 'R_Ankle_z', 'R_Toe_x', 'R_Toe_y', 'R_Toe_z', 'Torso_x', 'Torso_y', 'Torso_z', 'Spine_x', 'Spine_y', 'Spine_z', 'Chest_x', 'Chest_y', 'Chest_z', 'Neck_x', 'Neck_y', 'Neck_z', 'Head_x', 'Head_y', 'Head_z', 'L_Thorax_x', 'L_Thorax_y', 'L_Thorax_z', 'L_Shoulder_x', 'L_Shoulder_y', 'L_Shoulder_z', 'L_Elbow_x', 'L_Elbow_y', 'L_Elbow_z', 'L_Wrist_x', 'L_Wrist_y', 'L_Wrist_z', 'L_Hand_x', 'L_Hand_y', 'L_Hand_z', 'R_Thorax_x', 'R_Thorax_y', 'R_Thorax_z', 'R_Shoulder_x', 'R_Shoulder_y', 'R_Shoulder_z', 'R_Elbow_x', 'R_Elbow_y', 'R_Elbow_z', 'R_Wrist_x', 'R_Wrist_y', 'R_Wrist_z', 'R_Hand_x', 'R_Hand_y', 'R_Hand_z']
```

---

=== TASK 5: DEFAULT POSE ===

#### File: `protomotions/robot_configs/smpl.py` (Default Pose Definition)
For the SMPL and SMPL-X models, the default pose (`default_dof_pos`) is a standard canonical **T-pose / rest pose** where all joint angles are initialized to `0.0` radians.
The root (Pelvis) starting position is set based on the dynamic height of the model legs:
```python
default_root_height = 0.95  # meters
default_dof_pos = [0.0] * num_dofs  # zeros in radians
```

---

=== TASK 6: MOTION METADATA ===

- **fps**: `30` (standard AMASS dataset reference frame rate; resampled or interpolated dynamically to match simulation rates)
- **format**:
  - **Root Position**: 3D Cartesian vector `[x, y, z]` in meters.
  - **Root Rotation**: 4D Quaternion in `[x, y, z, w]` format (normalized).
  - **Joint DOFs**: Flat array of joint angles in radians representing composed local Euler coordinate systems traversed in Depth-First Search (DFS) hierarchy order.
- **coordinate_system**: Z-up, right-handed (gravity vector `[0, 0, -9.81]` points downwards along the negative Z-axis).
- **available_categories**: [walk, run, jump, vault, crawl, get_up, stand, sit, dance, turn, dynamic_athletics]

---

=== TASK 7: SIMULATION SETTINGS ===

- **gravity**: `[0.0, 0.0, -9.81]`
- **dt**:
  - **Physics Simulation (dt)**: `1 / 120`s (~8.33ms) or `1 / 200`s (~5.00ms) depending on the active simulator backend.
  - **Control/Policy Decision (dt)**: `1 / 30`s (~33.3ms) or `1 / 50`s (~20.0ms) (derived via `decimation` factor, which runs 2 to 4 physics steps per policy step).
- **substeps**: `decimation = 2 or 4` steps, `substeps = 2` (within physics simulator integration cycles).
- **friction**: Default static & dynamic friction coefficients map to the range `[0.5, 1.5]` (buckets dynamically randomized for robust sim-to-real transfer).
- **restitution**: Restitution (bounciness) coefficient maps to the range `[0.0, 0.1]`.
