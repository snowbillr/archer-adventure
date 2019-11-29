import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const baseGround: Partial<PhiniteStateMachine.States.State<Phecs.Entity>> = {
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Phecs.Entity) => {
        return !entity.components[PhysicsBodyComponent.tag].body.blocked.down;
      },
      to: (entity: Phecs.Entity) => {
        entity.components[PhysicsBodyComponent.tag].body.velocity.y = 100;

        if (entity.components[PhysicsBodyComponent.tag].body.velocity.x > 0) {
          return 'adventurer-fall-right';
        } else if (entity.components[PhysicsBodyComponent.tag].body.velocity.x < 0) {
          return 'adventurer-fall-left';
        } else {
          return 'adventurer-fall';
        }
      }
    }
  ]
}
