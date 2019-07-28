import { Adventurer } from '../index';
import { TransitionType, StateMerge } from '../../../components/phinite-state';

import { baseIdle } from './base-idle';

export const adventurerStand = StateMerge(baseIdle, {
  id: 'adventurer-stand',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-stand');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowRight',
      to: 'adventurer-run-right',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-run-left',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowDown',
      to: 'adventurer-crouch',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowUp',
      to: 'adventurer-jump',
    }
  ],
});
