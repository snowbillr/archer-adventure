import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const baseGround: Partial<PhiniteStateMachine.States.State<Entities.Adventurer>> = {
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Entities.Adventurer) => {
        const threshold = 20;
        if (entity.body.velocity.y > 5) {
          console.log('falling old threshold')
        }
        if (entity.body.velocity.y > threshold) {
          console.log('ground to fall - body.velocity.y', entity.body.velocity.y);
        }
        return entity.body.velocity.y > threshold;
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
