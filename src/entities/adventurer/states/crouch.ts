import { baseCrouch } from './base-crouch';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';

export const adventurerCrouch: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseCrouch, {
  id: 'adventurer-crouch',
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-crouch-left'
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowRight',
      to: 'adventurer-crouch-right'
    }
  ]
});
