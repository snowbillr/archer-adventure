import { Adventurer } from '..';
import { movementAttributes } from '../movement-attributes';
import { TransitionType, StateMerge } from '../../../components/phinite-state';

import { baseFall } from './base-fall';

export const adventurerFallRight = StateMerge(baseFall, {
  id: 'adventurer-fall-right',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity,
  },
  onEnter(adventurer: Adventurer, data: PhiniteState.StateData) {
    adventurer.sprite.flipX = false;
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
