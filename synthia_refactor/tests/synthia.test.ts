import { describe, expect, test, vi } from 'vitest';
import * as THREE from 'three';
import { PhysicsController } from '../src/PhysicsController';
import { AvatarSynchronizer } from '../src/AvatarSynchronizer';
import { ObservationBuilder } from '../src/ObservationBuilder';
import { SkeletonRig } from '../src/types';

describe('Synthia Humanoid Sim Refactor Tests', () => {

  describe('PhysicsController - PD and Proportional Torque', () => {
    test('computeProportionalTorque computes PD torque and respects effortLimits', () => {
      // Create a dummy world for initialization
      const mockWorld = {} as any;
      const controller = new PhysicsController(mockWorld);

      // Register a joint parameter
      const jointId = 'knee_joint';
      const mockJoint = {} as any;
      controller.registerJoint(jointId, mockJoint, {
        jointId,
        boneName: 'knee_bone',
        stiffness: 100, // Kp
        damping: 10,   // Kd
        effortLimit: 50 // Limit torque to 50
      });

      // 1. Calculate within limits
      // error = target - current = 0.2 - 0 = 0.2
      // stiffness_part = 100 * 0.2 = 20
      // velocity_part = 10 * 0.5 = 5
      // torque = 20 - 5 = 15
      const calculatedTorque = controller.computeProportionalTorque(jointId, 0.2, 0.0, 0.5);
      expect(calculatedTorque).toBe(15);

      // 2. Calculate hitting upper effortLimit
      // error = 1.0 - 0.0 = 1.0
      // stiffness_part = 100 * 1.0 = 100
      // torque = 100 - 0 = 100 (which exceeds effortLimit of 50)
      const clampedUpperTorque = controller.computeProportionalTorque(jointId, 1.0, 0.0, 0.0);
      expect(clampedUpperTorque).toBe(50);

      // 3. Calculate hitting lower effortLimit
      // error = -1.0 - 0.0 = -1.0
      // stiffness_part = 100 * -1.0 = -100
      // torque = -100 (which exceeds negative effortLimit of -50)
      const clampedLowerTorque = controller.computeProportionalTorque(jointId, -1.0, 0.0, 0.0);
      expect(clampedLowerTorque).toBe(-50);
    });
  });

  describe('AvatarSynchronizer - Decoupled Naming & Transform Sync', () => {
    test('syncMeshToPhysics resolves names correctly and offsets ground height', () => {
      const synchronizer = new AvatarSynchronizer(-0.05); // Y-offset of -0.05

      // Register custom name translations
      synchronizer.registerBoneTranslation('visualLeftKnee', 'physics_left_knee');
      expect(synchronizer.getBoneTranslation('visualLeftKnee')).toBe('physics_left_knee');

      // Setup mock THREE.js Skeleton bones and SkinnedMesh
      const pelvisBone = new THREE.Bone();
      const kneeBone = new THREE.Bone();

      const bonesMap = new Map<string, THREE.Bone>();
      bonesMap.set('pelvis', pelvisBone);
      bonesMap.set('visualLeftKnee', kneeBone);

      const mockMesh = {
        position: new THREE.Vector3(),
        quaternion: new THREE.Quaternion()
      } as any;

      const rig: SkeletonRig = {
        mesh: mockMesh,
        bonesMap
      };

      // Setup mock Rapier.js rigid bodies
      const mockPelvisBody = {
        translation: () => ({ x: 0, y: 1.0, z: 0 }),
        rotation: () => ({ x: 0, y: 0, z: 0, w: 1 })
      } as any;

      const mockKneeBody = {
        translation: () => ({ x: 0, y: 0.5, z: 0 }),
        rotation: () => ({ x: 0.707, y: 0, z: 0, w: 0.707 })
      } as any;

      const bodiesMap = new Map<string, any>();
      bodiesMap.set('pelvis', mockPelvisBody);
      bodiesMap.set('physics_left_knee', mockKneeBody); // Key matches translated name

      // Sync physical bodies to visual bones
      synchronizer.syncMeshToPhysics(rig, bodiesMap);

      // Expect pelvis and mesh root to be synced with ground height offset applied (1.0 - 0.05 = 0.95)
      expect(mockMesh.position.y).toBe(0.95);
      expect(mockMesh.quaternion.w).toBe(1);

      // Expect custom resolved visualLeftKnee to sync perfectly with physics_left_knee rotation
      expect(kneeBone.quaternion.x).toBe(0.707);
      expect(kneeBone.quaternion.w).toBe(0.707);
    });
  });

  describe('ObservationBuilder - Local Coordinate Framing', () => {
    test('buildObservation constructs local gravity, local velocities, and formats flat array', () => {
      const builder = new ObservationBuilder();

      // Setup a mock root body that is rotated 90 degrees (Math.PI / 2) around Z axis
      // Yaw/Pitch/Roll inverse quaternion verification
      const quat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);

      const mockRootBody = {
        translation: () => ({ x: 0, y: 1.5, z: 0 }),
        rotation: () => ({ x: quat.x, y: quat.y, z: quat.z, w: quat.w }),
        linvel: () => ({ x: 10, y: 0, z: 0 }),
        angvel: () => ({ x: 0, y: 0, z: 5 })
      } as any;

      // Mock joints
      const mockKneeJoint = { angle: () => 0.45 };
      const mockAnkleJoint = { angle: () => -0.22 };
      const joints = [mockKneeJoint, mockAnkleJoint];

      // Ground height is 0.0, so rootHeight = 1.5
      const obs = builder.buildObservation(mockRootBody, joints, 0.0);

      // Expected observation array length:
      // 1 (root height) + 3 (gravity) + 3 (local linvel) + 3 (local angvel) + 2 (joints) = 12
      expect(obs.length).toBe(12);
      expect(obs[0]).toBe(1.5); // Root height

      // Verified projected gravity [1:4]:
      // World gravity in Three.js is [0, -1, 0].
      // Rotated by inverse of 90deg Z quat (which is -90deg Z rotation):
      // R_inv * [0, -1, 0] = [1, 0, 0] approximately.
      expect(obs[1]).toBeCloseTo(1.0, 5);
      expect(obs[2]).toBeCloseTo(0.0, 5);
      expect(obs[3]).toBeCloseTo(0.0, 5);

      // Local linear velocity [4:7]:
      // World linear velocity was [10, 0, 0].
      // Rotated by inverse of 90deg Z:
      // [10, 0, 0] rotated -90deg Z becomes [0, 10, 0] approximately.
      expect(obs[4]).toBeCloseTo(0.0, 5);
      expect(obs[5]).toBeCloseTo(10.0, 5);
      expect(obs[6]).toBeCloseTo(0.0, 5);

      // Local joint angles at index 10 and 11
      expect(obs[10]).toBe(0.45);
      expect(obs[11]).toBe(-0.22);
    });
  });

});
