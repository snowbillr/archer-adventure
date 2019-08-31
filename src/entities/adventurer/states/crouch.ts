import { baseIdle } from './base-idle';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';

export const adventurerCrouch: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseIdle, {
  id: 'adventurer-crouch',
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.anims.play('adventurer-crouch');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: 'ArrowDown',
      to: (entity: Entities.Adventurer) => {
        if (entity.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (entity.controls.right.isDown) {
          return 'adventurer-run-right';
        } else {
          return 'adventurer-stand';
        }
      }
    }
  ]
});
