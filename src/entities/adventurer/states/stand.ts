import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';

export const adventurerStand: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseIdle, {
  id: 'adventurer-stand',
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-stand');
  },
  transitions: [
    {
      type: TransitionType.PressControl,
      control: 'right',
      to: 'adventurer-run',
    },
    {
      type: TransitionType.PressControl,
      control: 'left',
      to: 'adventurer-run',
    },
    {
      type: TransitionType.PressControl,
      control: 'down',
      to: 'adventurer-crouch',
    },
    {
      type: TransitionType.PressControl,
      control: 'up',
      to: 'adventurer-jump-prep',
    },
    {
      type: TransitionType.PressControl,
      control: 'shoot',
      to: 'adventurer-stand-draw'
    }
  ],
});
