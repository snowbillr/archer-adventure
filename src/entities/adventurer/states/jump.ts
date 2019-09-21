import { baseJump } from './base-jump';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerJump: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseJump, {
  id: 'adventurer-jump',
  data: {
    targetAerialHorizontalVelocity: 0,
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.left,
      to: 'adventurer-jump-left',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.right,
      to: 'adventurer-jump-right',
    },
    {
      type: TransitionType.Conditional,
      condition: (entity: Entities.Adventurer) => {
        return entity.body.velocity.y > 1;
      },
      to: 'adventurer-fall'
    }
  ]
});
