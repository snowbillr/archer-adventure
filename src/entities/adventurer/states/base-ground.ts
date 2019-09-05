import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const baseGround: Partial<PhiniteStateMachine.States.State<Entities.Adventurer>> = {
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Entities.Adventurer) => {
        // Sometimes when the adventurer is on the ground touching the tile they will start to 'fall'
        // no idea why, but their speed upon falling is 18.333. So this threshold doesn't trigger the fall
        // state unless they are moving faster than that value.
        // This doesn't negatively impact running off of a platform.
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
