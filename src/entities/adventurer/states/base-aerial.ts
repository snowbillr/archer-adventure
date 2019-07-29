import { Adventurer } from '..';
import { movementAttributes } from '../movement-attributes';

function applyAirControls(adventurer: Adventurer, targetVelocity) {
  if (adventurer.controls.left.isDown && adventurer.body.velocity.x > targetVelocity) {
    adventurer.body.acceleration.x = -1 * movementAttributes.fallHorizontalAcceleration;
  } else if (adventurer.controls.right.isDown && adventurer.body.velocity.x < targetVelocity) {
    adventurer.body.acceleration.x = movementAttributes.fallHorizontalAcceleration;
  }
}

function applyAirFriction(adventurer: Adventurer) {
  if (adventurer.body.velocity.x > 0) {
    adventurer.body.acceleration.x = -1 * movementAttributes.aerialFrictionAcceleration;
  } else if (adventurer.body.velocity.x < 0) {
    adventurer.body.acceleration.x = movementAttributes.aerialFrictionAcceleration;
  } else {
    adventurer.body.acceleration.x = 0;
  }
}

export const baseAerial = {
  onUpdate(adventurer: Adventurer, data: PhiniteState.StateData) {
    const controlsAreDown = adventurer.controls.left.isDown || adventurer.controls.right.isDown;

    if (controlsAreDown) {
      applyAirControls(adventurer, data.targetAerialHorizontalVelocity);
    } else {
      applyAirFriction(adventurer);
    }

    if (Phaser.Math.Within(data.targetAerialHorizontalVelocity, adventurer.body.velocity.x, 5)) {
      adventurer.body.acceleration.x = 0;
      adventurer.body.velocity.x = data.targetAerialHorizontalVelocity;
    }
  },
}
