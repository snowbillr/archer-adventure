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

        // If you see this happening while landing from a jump, adjust the bounding boxes
        // in the air animations to have some padding for landing.

        const threshold = 20;

        return entity.body.velocity.y > threshold;
      },
      to: (entity: Entities.Adventurer) => {
        console.log('going to falling from ground')
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
