import { baseCrouch } from './base-crouch';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';

export const adventurerCrouchLeft: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseCrouch, {
  id: 'adventurer-crouch-left',
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.flipX = true;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.right,
      to: 'adventurer-crouch-right'
    }
  ]
});
