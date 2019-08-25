import { baseJump } from './base-jump';
import { StateMerge, TransitionType } from '../../../components/phinite-state';
import { Adventurer } from '..';

export const adventurerJump = StateMerge(baseJump, {
  id: 'adventurer-jump',
  data: {
    targetAerialHorizontalVelocity: 0,
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-jump-left',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowRight',
      to: 'adventurer-jump-right',
    },
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        return adventurer.body.velocity.y > 1;
      },
      to: 'adventurer-fall'
    }
  ]
});
