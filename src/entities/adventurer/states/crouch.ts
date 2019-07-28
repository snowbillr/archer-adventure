import { Adventurer } from '../index';
import { TransitionType, StateMerge } from '../../../components/phinite-state';

import { baseIdle } from './base-idle';

export const adventurerCrouch = StateMerge(baseIdle, {
  id: 'adventurer-crouch',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-crouch');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: 'ArrowDown',
      to: (adventurer: Adventurer) => {
        if (adventurer.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (adventurer.controls.right.isDown) {
          return 'adventurer-run-right';
        } else {
          return 'adventurer-stand';
        }
      }
    }
  ]
});
