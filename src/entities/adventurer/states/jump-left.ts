import { baseJump } from './base-jump';
import { StateMerge, TransitionType } from '../../../components/phinite-state';
import { Adventurer } from '..';
import { movementAttributes } from '../movement-attributes';

export const adventurerJumpLeft = StateMerge(baseJump, {
  id: 'adventurer-jump-left',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity * -1,
  },
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.flipX = true;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowRight',
      to: 'adventurer-jump-right',
    },
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        return adventurer.body.velocity.y > 0;
      },
      to: 'adventurer-fall-left',
    }
  ]
});
