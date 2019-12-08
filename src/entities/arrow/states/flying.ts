import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const flying: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'arrow-flying',
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(arrow) {
        return !arrow.getComponent(PhysicsBodyComponent).body.blocked.none;
      },
      to: 'arrow-hit',
    }
  ],
  onEnter(arrow) {
    arrow.getComponent(SpriteComponent).sprite.active = true;
    arrow.getComponent(SpriteComponent).sprite.visible = true;
    arrow.getComponent(PhysicsBodyComponent).body.enable = true;
    arrow.getComponent(PhysicsBodyComponent).body.allowGravity = true;

    arrow.getComponent(PhysicsBodyComponent).body.setVelocity(400, 0);
  },
  onUpdate(arrow) {
    if (arrow.getComponent(PhysicsBodyComponent).body.blocked.none) {
      const angle = Math.atan2(arrow.getComponent(PhysicsBodyComponent).body.velocity.y, arrow.getComponent(PhysicsBodyComponent).body.velocity.x);
      arrow.getComponent(SpriteComponent).sprite.rotation = angle;
    }
  }
}
