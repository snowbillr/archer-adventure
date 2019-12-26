import { baseCrouch } from './base-crouch';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerCrouchRight: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseCrouch, {
  id: 'adventurer-crouch-right',
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.flipX = false;
  },
  transitions: [
    {
      type: TransitionType.PressControl,
      control: 'left',
      to: 'adventurer-crouch-left'
    }
  ]
});
