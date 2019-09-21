import { baseRun, startRunning } from './base-run';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerRunLeft: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseRun, {
  id: 'adventurer-run-left',
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.flipX = true;
    entity.sprite.anims.play('adventurer-run');

    startRunning(entity, "left");
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.codes.left,
      to: 'adventurer-stand',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.right,
      to: 'adventurer-run-right',
    },
  ]
});
