import { movementAttributes } from '../movement-attributes';

import { baseFall } from './base-fall';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';

export const adventurerFallRight: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseFall, {
  id: 'adventurer-fall-right',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity,
  },
  onEnter(entity: Entities.Adventurer, data: PhiniteStateMachine.States.StateData) {
    entity.sprite.flipX = false;
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
