import { movementAttributes } from '../movement-attributes';

function applyAirControls(entity: Entities.Adventurer, targetVelocity: number) {
  if (entity.controls.left.isDown && entity.body.velocity.x > targetVelocity) {
    entity.body.acceleration.x = -1 * movementAttributes.aerialHorizontalAcceleration;
  } else if (entity.controls.right.isDown && entity.body.velocity.x < targetVelocity) {
    entity.body.acceleration.x = movementAttributes.aerialHorizontalAcceleration;
  }
}

function applyAirFriction(entity: Entities.Adventurer) {
  if (entity.body.velocity.x > 0) {
    entity.body.acceleration.x = -1 * movementAttributes.aerialHorizontalFrictionAcceleration;
  } else if (entity.body.velocity.x < 0) {
    entity.body.acceleration.x = movementAttributes.aerialHorizontalFrictionAcceleration;
  } else {
    entity.body.acceleration.x = 0;
  }
}

export const baseAerial: Partial<PhiniteStateMachine.States.State<Entities.Adventurer>> = {
  onUpdate(entity: Entities.Adventurer, data: PhiniteStateMachine.States.StateData) {
    const controlsAreDown = entity.controls.left.isDown || entity.controls.right.isDown;

    if (controlsAreDown) {
      applyAirControls(entity, data.targetAerialHorizontalVelocity);
    } else {
      applyAirFriction(entity);
    }

    if (Phaser.Math.Within(data.targetAerialHorizontalVelocity, entity.body.velocity.x, 5)) {
      entity.body.acceleration.x = 0;
      entity.body.velocity.x = data.targetAerialHorizontalVelocity;
    }
  },
}
