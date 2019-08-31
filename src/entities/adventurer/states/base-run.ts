import { movementAttributes } from '../movement-attributes';

import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const baseRun: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseGround, {
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.flipX = false;
    entity.sprite.anims.play('adventurer-run');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowDown',
      to: (entity: Entities.Adventurer) => {
        if (Math.abs(entity.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
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

export function startRunning(entity: Entities.Adventurer, direction: "left" | "right") {
  if (direction === "left") {
    entity.body.acceleration.x = -movementAttributes.horizontalAcceleration;
  } else if (direction === "right") {
    entity.body.acceleration.x = movementAttributes.horizontalAcceleration;
  }

  boostTurnaroundVelocity(entity);
}


function boostTurnaroundVelocity(entity: Entities.Adventurer) {
  if (!Phaser.Math.Within(entity.body.velocity.x, 0, 5)) {
    entity.body.velocity.x += entity.body.velocity.x * 0.5 * -1;
  }
}
