import { Adventurer } from '../index';
import { TransitionType, StateMerge } from '../../../components/phinite-state';
import { movementAttributes } from '../movement-attributes';

import { baseAerial } from './base-aerial';

export const baseFall = StateMerge(baseAerial, {
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-fall');
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        return Phaser.Math.Within(adventurer.body.velocity.y, 0, 5);
      },
      to(adventurer: Adventurer) {
        if (adventurer.controls.down.isDown) {
          if (Math.abs(adventurer.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
            return 'adventurer-crouch';
          } else {
            return 'adventurer-slide';
          }
        } else if (adventurer.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (adventurer.controls.right.isDown) {
          return 'adventurer-run-right';
        }  else {
          return 'adventurer-stand';
        }
      }
    }
  ]
});
