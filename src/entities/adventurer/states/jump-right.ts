import { baseJump } from './base-jump';
import { StateMerge, TransitionType } from '../../../components/phinite-state';
import { Adventurer } from '..';
import { movementAttributes } from '../movement-attributes';

export const adventurerJumpRight = StateMerge(baseJump, {
  id: 'adventurer-jump-right',
  data: {
    horizontalMaxVelocity: movementAttributes.fallHorizontalMaxVelocity,
  },
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.flipX = false;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-jump-left',
    },
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        return adventurer.body.velocity.y > 0;
      },
      to: 'adventurer-fall-right',
    }
  ]
});
