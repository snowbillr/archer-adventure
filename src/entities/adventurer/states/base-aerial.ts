import { movementAttributes } from '../movement-attributes';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

function applyAirControls(entity: Entities.Adventurer, targetVelocity: number) {
  const body = entity.components[PhysicsBodyComponent.tag].body;

  if (entity.controls.left.isDown && body.velocity.x > targetVelocity) {
    body.acceleration.x = -1 * movementAttributes.aerialHorizontalAcceleration;
  } else if (entity.controls.right.isDown && body.velocity.x < targetVelocity) {
    body.acceleration.x = movementAttributes.aerialHorizontalAcceleration;
  }
}

function applyAirFriction(entity: Entities.Adventurer) {
  const body = entity.components[PhysicsBodyComponent.tag].body;

  if (body.velocity.x > 0) {
    body.acceleration.x = -1 * movementAttributes.aerialHorizontalFrictionAcceleration;
  } else if (body.velocity.x < 0) {
    body.acceleration.x = movementAttributes.aerialHorizontalFrictionAcceleration;
  } else {
    body.acceleration.x = 0;
  }
}

export const baseAerial: Partial<PhiniteStateMachine.States.State<Entities.Adventurer>> = {
  onUpdate(entity: Entities.Adventurer, data: PhiniteStateMachine.States.StateData) {
    const body = entity.components[PhysicsBodyComponent.tag].body;
    const controlsAreDown = entity.controls.left.isDown || entity.controls.right.isDown;

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
