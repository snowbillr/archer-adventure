import { baseFall } from './base-fall';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerFall: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseFall, {
  id: 'adventurer-fall',
  data: {
    horizontalMaxVelocity: 0,
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-fall-left',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowRight',
      to: 'adventurer-fall-right',
    }
  ],
});
