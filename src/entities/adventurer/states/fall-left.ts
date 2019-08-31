import { movementAttributes } from '../movement-attributes';

import { baseFall } from './base-fall';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerFallLeft: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseFall, {
  id: 'adventurer-fall-left',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity * -1,
  },
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.flipX = true;
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
