import { Adventurer } from '..';
import { movementAttributes } from '../movement-attributes';
import { TransitionType } from '../../../components/phinite-state';

export const adventurerFallRight = {
  id: 'adventurer-fall-right',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-fall');
    adventurer.sprite.flipX = false;

    adventurer.body.acceleration.x = movementAttributes.fallDriftAcceleration;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-fall-left',
    },
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
};
