import { SpriteComponent } from '../../../components/sprite-component';

export const disabled: PhiniteStateMachine.States.State<Entities.Arrow> = {
  id: 'arrow-disabled',
  transitions: [],
  onEnter(arrow) {
    arrow.components[SpriteComponent.tag].sprite.active = false;
    arrow.components[SpriteComponent.tag].sprite.visible = false;
    arrow.body.enable = false;
    arrow.body.allowGravity = false;
  },
  onLeave(arrow) {
    arrow.components[SpriteComponent.tag].sprite.active = true;
    arrow.components[SpriteComponent.tag].sprite.visible = true;
    arrow.body.enable = true;
    arrow.body.allowGravity = true;
  }
}
