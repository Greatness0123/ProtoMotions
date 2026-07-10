import RAPIER from '@dimforge/rapier3d-compat';
import { JointParameter } from './types';

export class PhysicsController {
  private world: RAPIER.World;
  private joints: Map<string, RAPIER.PrismaticJoint | RAPIER.RevoluteJoint> = new Map();
  private jointParams: Map<string, JointParameter> = new Map();

  constructor(world: RAPIER.World) {
    this.world = world;
  }

  /**
   * Registers a Rapier joint with its tuning parameters.
   */
  public registerJoint(jointId: string, joint: RAPIER.PrismaticJoint | RAPIER.RevoluteJoint, params: JointParameter): void {
    this.joints.set(jointId, joint);
    this.jointParams.set(jointId, params);
  }

  /**
   * Applies motor target configurations using Rapier's internal motor APIs.
   * Maps to ProtoMotions' BUILT_IN_PD mode.
   */
  public applyJointTarget(jointId: string, targetAngle: number): void {
    const joint = this.joints.get(jointId);
    const params = this.jointParams.get(jointId);
    if (!joint || !params) return;

    // Direct mapping to Rapier's PD motor configuration
    if (joint instanceof RAPIER.RevoluteJoint) {
      joint.configureMotorPosition(targetAngle, params.stiffness, params.damping);
    }
  }

  /**
   * Computes torque manually using Proportional-Derivative (PD) control.
   * Modelled exactly after ProtoMotions' PROPORTIONAL mode:
   * torque = stiffness * (target - current) - damping * velocity
   * clipped to effortLimit.
   */
  public computeProportionalTorque(
    jointId: string,
    targetAngle: number,
    currentAngle: number,
    currentVelocity: number
  ): number {
    const params = this.jointParams.get(jointId);
    if (!params) return 0;

    const error = targetAngle - currentAngle;
    let torque = params.stiffness * error - params.damping * currentVelocity;

    // Clip to joint effort limit
    const limit = params.effortLimit;
    if (torque > limit) torque = limit;
    if (torque < -limit) torque = -limit;

    return torque;
  }

  /**
   * Advances the simulation by dt.
   */
  public step(dt: number): void {
    this.world.timestep = dt;
    this.world.step();
  }

  public getJoint(jointId: string) {
    return this.joints.get(jointId);
  }

  public getJointParams(jointId: string) {
    return this.jointParams.get(jointId);
  }
}
