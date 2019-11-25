import { movementAttributes } from '../movement-attributes';

import { baseFall } from './base-fall';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';

export const adventurerFallRight: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseFall, {
  id: 'adventurer-fall-right',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity,
  },
  onEnter(entity: Entities.Adventurer, data: PhiniteStateMachine.States.StateData) {
    entity.components[SpriteComponent.tag].sprite.flipX = false;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.left,
      to: 'adventurer-fall-left',
    }
  ]
});
