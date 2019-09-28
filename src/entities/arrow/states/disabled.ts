import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const disabled: PhiniteStateMachine.States.State<Entities.Arrow> = {
  id: 'arrow-disabled',
  transitions: [],
  onEnter(arrow) {
    arrow.sprite.active = false;
    arrow.sprite.visible = false;
    arrow.body.enable = false;
    arrow.body.allowGravity = false;
  },
  onLeave(arrow) {
    arrow.sprite.active = true;
    arrow.sprite.visible = true;
    arrow.body.enable = true;
    arrow.body.allowGravity = true;
  }
}
