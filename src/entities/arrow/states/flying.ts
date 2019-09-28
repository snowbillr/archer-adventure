import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const flying: PhiniteStateMachine.States.State<Entities.Arrow> = {
  id: 'arrow-flying',
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(arrow) {
        return !arrow.body.blocked.none;
      },
      to: 'arrow-hit',
    }
  ],
  onEnter(arrow) {
    arrow.sprite.active = true;
    arrow.sprite.visible = true;
    arrow.body.enable = true;
    arrow.body.allowGravity = true;

    arrow.body.setVelocity(400, 0);
  },
  onUpdate(arrow) {
    if (arrow.body.blocked.none) {
      const angle = Math.atan2(arrow.body.velocity.y, arrow.body.velocity.x);
      arrow.sprite.rotation = angle;
    }
  }
}
