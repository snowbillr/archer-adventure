import { baseJump } from './base-jump';
import { movementAttributes } from '../movement-attributes';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerJumpRight: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseJump, {
  id: 'adventurer-jump-right',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity,
  },
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.flipX = false;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.left,
      to: 'adventurer-jump-left',
    },
    {
      type: TransitionType.Conditional,
      condition: (entity: Entities.Adventurer) => {
        return entity.body.velocity.y > 0;
      },
      to: 'adventurer-fall-right',
    }
  ]
});
