import { Adventurer } from '..';
import { TransitionType } from '../../../components/phinite-state';

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
        return 'adventurer-jump';
      }
    }
  ]
}
