import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const baseGround: Partial<PhiniteStateMachine.States.State<Phecs.Entity>> = {
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Phecs.Entity) => {
        return !entity.getComponent(PhysicsBodyComponent).body.blocked.down;
      },
      to: (entity: Phecs.Entity) => {
        entity.getComponent(PhysicsBodyComponent).body.velocity.y = 100;

        if (entity.getComponent(PhysicsBodyComponent).body.velocity.x > 0) {
          return 'adventurer-fall-right';
        } else if (entity.getComponent(PhysicsBodyComponent).body.velocity.x < 0) {
          return 'adventurer-fall-left';
        } else {
          return 'adventurer-fall';
        }
      }
    }
  ]
}
