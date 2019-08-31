import { baseJump } from './base-jump';
import { movementAttributes } from '../movement-attributes';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerJumpLeft: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseJump, {
  id: 'adventurer-jump-left',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity * -1,
  },
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.flipX = true;
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
      condition: (entity: Entities.Adventurer) => {
        return entity.body.velocity.y > 0;
      },
      to: 'adventurer-fall-left',
    }
  ]
});
