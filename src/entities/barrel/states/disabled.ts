import { SpriteComponent } from "../../../components/sprite-component";
import { HurtboxComponent } from "../../../components/hurtbox-component";

export const disabled: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'barrel-disabled',
  transitions: [],
  onEnter(barrel) {
    barrel.getComponent(SpriteComponent).sprite.active = false;
    barrel.getComponent(SpriteComponent).sprite.visible = false;
    barrel.getComponent(HurtboxComponent).disable();
  },
}