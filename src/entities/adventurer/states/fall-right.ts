import { Adventurer } from '..';
import { movementAttributes } from '../movement-attributes';
import { TransitionType, StateMerge } from '../../../components/phinite-state';

import { baseFall } from './base-fall';

export const adventurerFallRight = StateMerge(baseFall, {
  id: 'adventurer-fall-right',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.flipX = false;

    adventurer.body.acceleration.x = movementAttributes.fallDriftAcceleration;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-fall-left',
    }
  ]
});
