import { Adventurer } from '..';
import { TransitionType } from '../../../components/phinite-state';
import { movementAttributes } from '../movement-attributes';

export const adventurerJumpPrep = {
  id: 'adventurer-jump-prep',
  onEnter(adventurer: Adventurer) {
    adventurer.body.acceleration.x = 0;

    adventurer.sprite.anims.play('adventurer-jump-prep');
  },
  transitions: [
    {
      type: TransitionType.AnimationEnd,
      animationKey: 'adventurer-jump-prep',
      to: (adventurer: Adventurer) => {
        if (adventurer.controls.right.isDown) {
          return 'adventurer-jump-right';
        } else if (adventurer.controls.left.isDown) {
          return 'adventurer-jump-left';
        } else if (adventurer.body.velocity.x > 0) {
          return 'adventurer-jump-right';
        } else if (adventurer.body.velocity.x < 0) {
          return 'adventurer-jump-left';
        } else {
          return 'adventurer-jump';
        }
      },
      onTransition: (adventurer: Adventurer) => {
        adventurer.body.velocity.y = movementAttributes.jumpVelocity;
      },
    }
  ]
}
