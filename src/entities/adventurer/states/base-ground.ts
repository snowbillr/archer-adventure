import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const baseGround: Partial<PhiniteStateMachine.States.State<Entities.Adventurer>> = {
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Entities.Adventurer) => {
        return !entity.body.blocked.down;
      },
      to: (entity: Entities.Adventurer) => {
        entity.body.velocity.y = 100;

        if (entity.body.velocity.x > 0) {
          return 'adventurer-fall-right';
        } else if (entity.body.velocity.x < 0) {
          return 'adventurer-fall-left';
        } else {
          return 'adventurer-fall';
        }
      }
    }
  ]
}
