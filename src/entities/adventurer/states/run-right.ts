import { Adventurer } from '../index';
import { TransitionType, StateMerge } from '../../../components/phinite-state';
import { movementAttributes } from '../movement-attributes';

import { baseRun, startRunning } from './base-run';

export const adventurerRunRight = StateMerge(baseRun, {
  id: 'adventurer-run-right',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.flipX = false;
    adventurer.sprite.anims.play('adventurer-run');

    startRunning(adventurer, "right");
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: 'ArrowRight',
      to: 'adventurer-stand',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-run-left',
    },
  ]
});
