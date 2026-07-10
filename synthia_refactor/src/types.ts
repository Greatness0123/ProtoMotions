import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

export interface JointParameter {
  jointId: string;
  boneName: string;
  stiffness: number; // Kp (Proportional gain)
  damping: number;   // Kd (Derivative gain)
  effortLimit: number; // Maximum torque limit
  minLimit?: number;   // Optional rotational limit
  maxLimit?: number;   // Optional rotational limit
}

export interface SkeletonRig {
  mesh: THREE.SkinnedMesh;
  bonesMap: Map<string, THREE.Bone>;
}

export interface RobotMorphology {
  name: string;
  joints: JointParameter[];
  rootBodyName: string;
}
