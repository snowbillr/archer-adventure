import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const disabled: PhiniteStateMachine.States.State<Entities.Arrow> = {
  id: 'arrow-disabled',
  transitions: [],
  onEnter(arrow) {
    arrow.components[SpriteComponent.tag].sprite.active = false;
    arrow.components[SpriteComponent.tag].sprite.visible = false;
    arrow.components[PhysicsBodyComponent.tag].body.enable = false;
    arrow.components[PhysicsBodyComponent.tag].body.allowGravity = false;
  },
  onLeave(arrow) {
    arrow.components[SpriteComponent.tag].sprite.active = true;
    arrow.components[SpriteComponent.tag].sprite.visible = true;
    arrow.components[PhysicsBodyComponent.tag].body.enable = true;
    arrow.components[PhysicsBodyComponent.tag].body.allowGravity = true;
  }
}
