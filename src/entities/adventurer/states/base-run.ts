import { Adventurer } from '../index';
import { movementAttributes } from '../movement-attributes';

export const baseRun = {
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.flipX = false;
    adventurer.sprite.anims.play('adventurer-run');
  },
}

export function startRunning(adventurer: Adventurer, direction: "left" | "right") {
  if (direction === "left") {
    adventurer.body.acceleration.x = -movementAttributes.horizontalAcceleration;
  } else if (direction === "right") {
    adventurer.body.acceleration.x = movementAttributes.horizontalAcceleration;
  }

  boostTurnaroundVelocity(adventurer);
}


function boostTurnaroundVelocity(adventurer: Adventurer) {
  if (!Phaser.Math.Within(adventurer.body.velocity.x, 0, 5)) {
    adventurer.body.velocity.x += adventurer.body.velocity.x * 0.5 * -1;
  }
}
