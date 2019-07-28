import { Adventurer } from '..';
import { movementAttributes } from '../movement-attributes';
import { TransitionType, StateMerge } from '../../../components/phinite-state';

import { baseFall } from './base-fall';

export const adventurerFallLeft = StateMerge(baseFall, {
  id: 'adventurer-fall-left',
  data: {
    horizontalMaxVelocity: movementAttributes.fallHorizontalMaxVelocity * -1,
  },
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.flipX = true;
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
