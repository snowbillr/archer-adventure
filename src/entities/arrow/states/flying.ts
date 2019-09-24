import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const flying: PhiniteStateMachine.States.State<Entities.Arrow> = {
  id: 'arrow-flying',
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(arrow) {
        if (!arrow.body.blocked.none) {
          console.log('transitioning')
        }
        return !arrow.body.blocked.none;
      },
      to: 'arrow-hit',
    }
  ],
  onEnter(arrow) {
    arrow.body.setVelocity(400, 0);
  },
  onUpdate(arrow) {
    if (arrow.body.blocked.none) {
      const angle = Math.atan2(arrow.body.velocity.y, arrow.body.velocity.x);
      arrow.sprite.rotation = angle;
    }
  }
}
