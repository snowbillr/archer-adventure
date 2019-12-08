import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { HitboxComponent } from '../../../components/hitbox-component';

export const disabled: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'arrow-disabled',
  transitions: [],
  onEnter(arrow) {
    arrow.getComponent(SpriteComponent).sprite.active = false;
    arrow.getComponent(SpriteComponent).sprite.visible = false;
    arrow.getComponent(PhysicsBodyComponent).body.enable = false;
    arrow.getComponent(PhysicsBodyComponent).body.allowGravity = false;
    arrow.getComponent(HitboxComponent).disable();
  },
  onLeave(arrow) {
    arrow.getComponent(SpriteComponent).sprite.active = true;
    arrow.getComponent(SpriteComponent).sprite.visible = true;
    arrow.getComponent(PhysicsBodyComponent).body.enable = true;
    arrow.getComponent(PhysicsBodyComponent).body.allowGravity = true;
    arrow.getComponent(HitboxComponent).enable();
  }
}
