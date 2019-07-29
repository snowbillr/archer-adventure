import { Adventurer } from '..';
import { movementAttributes } from '../movement-attributes';

function applyAirControls(adventurer: Adventurer, targetVelocity) {
  if (adventurer.controls.left.isDown && adventurer.body.velocity.x > targetVelocity) {
    adventurer.body.acceleration.x = -1 * movementAttributes.aerialHorizontalAcceleration;
  } else if (adventurer.controls.right.isDown && adventurer.body.velocity.x < targetVelocity) {
    adventurer.body.acceleration.x = movementAttributes.aerialHorizontalAcceleration;
  }
}

function applyAirFriction(adventurer: Adventurer) {
  if (adventurer.body.velocity.x > 0) {
    adventurer.body.acceleration.x = -1 * movementAttributes.aerialHorizontalFrictionAcceleration;
  } else if (adventurer.body.velocity.x < 0) {
    adventurer.body.acceleration.x = movementAttributes.aerialHorizontalFrictionAcceleration;
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
