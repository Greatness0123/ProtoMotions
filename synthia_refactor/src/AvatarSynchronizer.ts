import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import { SkeletonRig } from './types';

export class AvatarSynchronizer {
  private bodyOffsetY: number; // Ground clipping adjustment offset
  private boneTranslationMap: Map<string, string> = new Map(); // visualBoneName -> physicsBodyName

  constructor(bodyOffsetY: number = 0.0) {
    this.bodyOffsetY = bodyOffsetY;
  }

  /**
   * Registers a translation map to resolve naming mismatches between Three.js Bones and Rapier bodies.
   * e.g., "mixamorigLeftUpLeg" -> "left_thigh"
   */
  public registerBoneTranslation(visualBoneName: string, physicsBodyName: string): void {
    this.boneTranslationMap.set(visualBoneName, physicsBodyName);
  }

  /**
   * Copies world-space transforms of physics bodies to the SkinnedMesh and local joint bone structures.
   * This is decoupled: physics remains the source of truth, and three.js acts as the visual puppet.
   */
  public syncMeshToPhysics(rig: SkeletonRig, bodies: Map<string, RAPIER.RigidBody>): void {
    // 1. Sync visual mesh root to physics root ("pelvis")
    const rootPhysicsName = "pelvis";
    const rootBody = bodies.get(rootPhysicsName);
    if (rootBody) {
      const translation = rootBody.translation();
      const rotation = rootBody.rotation();

      rig.mesh.position.set(
        translation.x,
        translation.y + this.bodyOffsetY, // Offset to prevent floor clipping
        translation.z
      );
      rig.mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    }

    // 2. Sync visual bones to corresponding rigid bodies
    rig.bonesMap.forEach((bone, visualBoneName) => {
      // Resolve the physics body name (use translation map or default to the bone name)
      const physicsBodyName = this.boneTranslationMap.get(visualBoneName) || visualBoneName;
      const body = bodies.get(physicsBodyName);

      if (body && physicsBodyName !== rootPhysicsName) {
        const rotation = body.rotation();
        bone.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);

        // If the bone has a translation offset (like a sliding prismatic body), copy translation
        // Otherwise, skinned mesh bone transforms are typically relative rotations only.
      }
    });
  }

  public getBoneTranslation(visualBoneName: string): string | undefined {
    return this.boneTranslationMap.get(visualBoneName);
  }
}
