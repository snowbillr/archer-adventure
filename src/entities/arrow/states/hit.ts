import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SSL_OP_PKCS1_CHECK_1 } from 'constants';

export const hit: PhiniteStateMachine.States.State<Entities.Arrow> = {
  id: 'arrow-hit',
  transitions: [],
  onEnter(arrow) {
    arrow.body.setVelocity(0, 0);
    arrow.body.allowGravity = false;

    arrow.sprite.depth = -1;
  }
}
