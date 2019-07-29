import { Adventurer } from '../index';
import { movementAttributes } from '../movement-attributes';
import { TransitionType, StateMerge } from '../../../components/phinite-state';

import { baseGround } from './base-ground';

export const adventurerSlide = StateMerge(baseGround, {
  id: 'adventurer-slide',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-slide')

    if (adventurer.body.velocity.x > 0) {
      adventurer.body.acceleration.x = -1 * movementAttributes.slideDeceleration;
    } else {
      adventurer.body.acceleration.x = movementAttributes.slideDeceleration;
    }
  },
  transitions: [
    {
      type: TransitionType.CurrentAnimationEnd,
      to: (adventurer: Adventurer) => {
        if (adventurer.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (adventurer.controls.right.isDown) {
          return 'adventurer-run-right';
        } else if (adventurer.controls.down.isDown) {
          return 'adventurer-crouch';
        } else {
          return 'adventurer-stand';
        }
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowUp',
      to: 'adventurer-jump-prep',
    }
  ],
});
