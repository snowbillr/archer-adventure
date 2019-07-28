import { Adventurer } from '..';
import { TransitionType } from '../../../components/phinite-state';
import { movementAttributes } from '../movement-attributes';

export const adventurerJump = {
  id: 'adventurer-jump',
  onEnter(adventurer: Adventurer) {
    adventurer.body.acceleration.x = 0;

    adventurer.sprite.once(`${Phaser.Animations.Events.SPRITE_ANIMATION_KEY_START}adventurer-jump-rise`, () => {
      adventurer.body.velocity.y = movementAttributes.jumpVelocity;
    });

    adventurer.sprite.anims.play('adventurer-jump-prep');
    adventurer.sprite.anims.chain('adventurer-jump-rise');
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
