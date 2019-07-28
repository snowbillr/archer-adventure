import { Adventurer } from '..';
import { movementAttributes } from '../movement-attributes';

export const baseAerial = {
  onEnter(adventurer: Adventurer, data: PhiniteState.StateData) {
    if (adventurer.body.velocity.x < data.targetAerialHorizontalVelocity) {
      adventurer.body.acceleration.x = movementAttributes.fallHorizontalAcceleration;
    } else if (adventurer.body.velocity.x > data.targetAerialHorizontalVelocity) {
      adventurer.body.acceleration.x = -1 * movementAttributes.fallHorizontalAcceleration;
    }
  },
  onUpdate(adventurer: Adventurer, data: PhiniteState.StateData) {
    if (Phaser.Math.Within(data.targetAerialHorizontalVelocity, adventurer.body.velocity.x, 5)) {
      adventurer.body.acceleration.x = 0;
      adventurer.body.velocity.x = data.targetAerialHorizontalVelocity;
    }
  },
}
