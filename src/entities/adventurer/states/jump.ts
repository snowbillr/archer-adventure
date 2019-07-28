import { Adventurer } from '..';
import { TransitionType } from '../../../components/phinite-state';
import { movementAttributes } from '../movement-attributes';

export const adventurerJump = {
  id: 'adventurer-jump',
  onEnter(adventurer: Adventurer) {
    adventurer.body.velocity.y = movementAttributes.jumpVelocity;

    adventurer.sprite.anims.play('adventurer-jump-rise');
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        return adventurer.body.velocity.y > 0;
      },
      to(adventurer: Adventurer) {
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
};
