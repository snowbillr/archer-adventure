import { baseCrouch } from './base-crouch';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerCrouch: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseCrouch, {
  id: 'adventurer-crouch',
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.getComponent(AdventurerComponent).codes.left,
      to: 'adventurer-crouch-left'
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.getComponent(AdventurerComponent).codes.right,
      to: 'adventurer-crouch-right'
    }
  ]
});
