import { baseJump } from './base-jump';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const adventurerJump: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseJump, {
  id: 'adventurer-jump',
  data: {
    targetAerialHorizontalVelocity: 0,
  },
  transitions: [
    {
      type: TransitionType.PressControl,
      control: 'left',
      to: 'adventurer-jump-left',
    },
    {
      type: TransitionType.PressControl,
      control: 'right',
      to: 'adventurer-jump-right',
    },
    {
      type: TransitionType.Conditional,
      condition: (entity: Phecs.Entity) => {
        return entity.getComponent(PhysicsBodyComponent).body.velocity.y > 1;
      },
      to: 'adventurer-fall'
    }
  ]
});
