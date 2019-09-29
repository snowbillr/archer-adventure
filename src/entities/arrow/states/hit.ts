import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const hit: PhiniteStateMachine.States.State<Entities.Arrow> = {
  id: 'arrow-hit',
  transitions: [],
  onEnter(arrow) {
    arrow.body.setVelocity(0, 0);
    arrow.body.allowGravity = false;

    arrow.sprite.depth = -1;
  }
}
