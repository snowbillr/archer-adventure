import { baseJump } from './base-jump';
import { movementAttributes } from '../movement-attributes';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const adventurerJumpRight: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseJump, {
  id: 'adventurer-jump-right',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity,
  },
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.flipX = false;
  },
  transitions: [
    {
      type: TransitionType.PressControl,
      control: 'left',
      to: 'adventurer-jump-left',
    },
    {
      type: TransitionType.Conditional,
      condition: (entity: Phecs.Entity) => {
        return entity.getComponent(PhysicsBodyComponent).body.velocity.y > 0;
      },
      to: 'adventurer-fall-right',
    }
  ]
});
