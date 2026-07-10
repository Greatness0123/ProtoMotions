import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

export class ObservationBuilder {
  /**
   * Packages physical rigid body transforms and joint angles into a flat yaw-invariant state array.
   *
   * Formatted schema (sequential):
   * 1. Root Height above Ground [1]
   * 2. Local Gravity vector in Root local frame [3]
   * 3. Local Root Linear Velocity [3]
   * 4. Local Root Angular Velocity [3]
   * 5. Joint Angles [N]
   *
   * In Three.js, Y-axis is up and gravity is [0, -1, 0].
   */
  public buildObservation(
    rootBody: RAPIER.RigidBody,
    joints: { angle: () => number }[],
    groundHeight: number = 0.0
  ): Float32Array {
    const translation = rootBody.translation();
    const rotation = rootBody.rotation();
    const linvel = rootBody.linvel();
    const angvel = rootBody.angvel();

    // 1. Root Height above Ground
    const rootHeight = translation.y - groundHeight;

    // 2. Projected Gravity Vector in local frame
    const rootQuat = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const invRootQuat = rootQuat.clone().invert();

    // In Three.js, gravity points in -Y direction: Vector3(0, -1, 0)
    const gravityVec = new THREE.Vector3(0, -1, 0);
    gravityVec.applyQuaternion(invRootQuat);

    // 3. World velocities transformed to local frame
    const localLinVel = new THREE.Vector3(linvel.x, linvel.y, linvel.z);
    localLinVel.applyQuaternion(invRootQuat);

    const localAngVel = new THREE.Vector3(angvel.x, angvel.y, angvel.z);
    localAngVel.applyQuaternion(invRootQuat);

    // Build the flat array
    const obsList: number[] = [];
    obsList.push(rootHeight);

    obsList.push(gravityVec.x, gravityVec.y, gravityVec.z);
    obsList.push(localLinVel.x, localLinVel.y, localLinVel.z);
    obsList.push(localAngVel.x, localAngVel.y, localAngVel.z);

    // Joint angles
    joints.forEach(joint => {
      obsList.push(joint.angle());
    });

    return new Float32Array(obsList);
  }
}
