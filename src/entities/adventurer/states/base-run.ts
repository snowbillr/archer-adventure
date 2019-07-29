import { Adventurer } from '../index';
import { movementAttributes } from '../movement-attributes';
import { TransitionType, StateMerge } from '../../../components/phinite-state';

import { baseGround } from './base-ground';

export const baseRun = StateMerge(baseGround, {
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.flipX = false;
    adventurer.sprite.anims.play('adventurer-run');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowDown',
      to: (adventurer: Adventurer) => {
        if (Math.abs(adventurer.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
          return 'adventurer-crouch';
        } else {
          return 'adventurer-slide';
        }
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowUp',
      to: 'adventurer-jump-prep',
    }
  ]
});

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
