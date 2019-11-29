import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const flying: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'arrow-flying',
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(arrow) {
        return !arrow.components[PhysicsBodyComponent.tag].body.blocked.none;
      },
      to: 'arrow-hit',
    }
  ],
  onEnter(arrow) {
    arrow.components[SpriteComponent.tag].sprite.active = true;
    arrow.components[SpriteComponent.tag].sprite.visible = true;
    arrow.components[PhysicsBodyComponent.tag].body.enable = true;
    arrow.components[PhysicsBodyComponent.tag].body.allowGravity = true;

    arrow.components[PhysicsBodyComponent.tag].body.setVelocity(400, 0);
  },
  onUpdate(arrow) {
    if (arrow.components[PhysicsBodyComponent.tag].body.blocked.none) {
      const angle = Math.atan2(arrow.components[PhysicsBodyComponent.tag].body.velocity.y, arrow.components[PhysicsBodyComponent.tag].body.velocity.x);
      arrow.components[SpriteComponent.tag].sprite.rotation = angle;
    }
  }
}
