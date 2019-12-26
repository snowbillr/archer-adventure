import { movementAttributes } from '../movement-attributes';

import { baseFall } from './base-fall';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerFallRight: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseFall, {
  id: 'adventurer-fall-right',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity,
  },
  onEnter(entity: Phecs.Entity, data: PhiniteStateMachine.States.StateData) {
    entity.getComponent(SpriteComponent).sprite.flipX = false;
  },
  transitions: [
    {
      type: TransitionType.PressControl,
      control: 'left',
      to: 'adventurer-fall-left',
    }
  ]
});
