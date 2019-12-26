import { movementAttributes } from '../movement-attributes';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { SceneComponent } from '../../../components/scene-component';
import { BaseScene } from '../../../scenes/base-scene';

function applyAirControls(entity: Phecs.Entity, targetVelocity: number) {
  const body = entity.getComponent(PhysicsBodyComponent).body;
  const controls = (entity.getComponent(SceneComponent).scene as BaseScene).controls;

  if (controls.left.isPressed && body.velocity.x > targetVelocity) {
    body.acceleration.x = -1 * movementAttributes.aerialHorizontalAcceleration;
  } else if (controls.right.isPressed && body.velocity.x < targetVelocity) {
    body.acceleration.x = movementAttributes.aerialHorizontalAcceleration;
  }
}

function applyAirFriction(entity: Phecs.Entity) {
  const body = entity.getComponent(PhysicsBodyComponent).body;

  if (body.velocity.x > 0) {
    body.acceleration.x = -1 * movementAttributes.aerialHorizontalFrictionAcceleration;
  } else if (body.velocity.x < 0) {
    body.acceleration.x = movementAttributes.aerialHorizontalFrictionAcceleration;
  } else {
    body.acceleration.x = 0;
  }
}

export const baseAerial: Partial<PhiniteStateMachine.States.State<Phecs.Entity>> = {
  onUpdate(entity: Phecs.Entity, data: PhiniteStateMachine.States.StateData) {
    const body = entity.getComponent(PhysicsBodyComponent).body;
    const controls = (entity.getComponent(SceneComponent).scene as BaseScene).controls;
    const controlsAreDown = controls.left.isPressed || controls.right.isPressed;

    if (controlsAreDown) {
      applyAirControls(entity, data.targetAerialHorizontalVelocity);
    } else {
      applyAirFriction(entity);
    }

    if (Phaser.Math.Within(data.targetAerialHorizontalVelocity, body.velocity.x, 5)) {
      body.acceleration.x = 0;
      body.velocity.x = data.targetAerialHorizontalVelocity;
    }
  },
}
