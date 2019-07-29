import { TransitionType } from '../../../components/phinite-state';
import { Adventurer } from '..';

export const baseGround = {
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        return adventurer.body.velocity.y > 0;
      },
      to: (adventurer: Adventurer) => {
        if (adventurer.body.velocity.x > 0) {
          return 'adventurer-fall-right';
        } else if (adventurer.body.velocity.x < 0) {
          return 'adventurer-fall-left';
        } else {
          return 'adventurer-fall';
        }
      }
    }
  ]
}
