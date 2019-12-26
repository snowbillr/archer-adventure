import { baseFall } from './base-fall';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerFall: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseFall, {
  id: 'adventurer-fall',
  data: {
    horizontalMaxVelocity: 0,
  },
  transitions: [
    {
      type: TransitionType.PressControl,
      control: 'left',
      to: 'adventurer-fall-left',
    },
    {
      type: TransitionType.PressControl,
      control: 'right',
      to: 'adventurer-fall-right',
    }
  ],
});
