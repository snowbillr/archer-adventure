import { Adventurer } from '..';
import { movementAttributes } from '../movement-attributes';
import { TransitionType, StateMerge } from '../../../components/phinite-state';

import { baseFall } from './base-fall';

export const adventurerFallLeft = StateMerge(baseFall, {
  id: 'adventurer-fall-left',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.flipX = true;

    adventurer.body.acceleration.x = -1 * movementAttributes.fallDriftAcceleration;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowRight',
      to: 'adventurer-fall-right',
    }
  ]
});
