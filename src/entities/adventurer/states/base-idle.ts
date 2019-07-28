import { Adventurer } from '../index';
import { movementAttributes } from '../movement-attributes';

function decelerate(adventurer: Adventurer) {
  adventurer.body.acceleration.x = adventurer.body.velocity.x < 0 ? movementAttributes.horizontalDeceleration : -movementAttributes.horizontalDeceleration;
}

function haltMovementWithinThreshold(adventurer: Adventurer) {
  if (Phaser.Math.Within(adventurer.body.velocity.x, 0, 100)) {
    adventurer.body.acceleration.x = 0;
    adventurer.body.velocity.x = 0;
  }
}

export const baseIdle: Partial<PhiniteState.State<Adventurer>> = {
  onEnter(adventurer: Adventurer) {
    decelerate(adventurer);
  },
  onUpdate(adventurer: Adventurer) {
    haltMovementWithinThreshold(adventurer);
  },
}
