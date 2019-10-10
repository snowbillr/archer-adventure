import { baseAerial } from './base-aerial';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerAirDraw: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge<Entities.Adventurer>(baseAerial, {
  id: 'adventurer-air-draw',
  onEnter(entity) {
    entity.sprite.anims.play('adventurer-air-draw', true);
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.codes.attack,
      to: 'adventurer-air-shoot',
    },
    {
      type: TransitionType.Conditional,
      condition(entity) {
        return !entity.sprite.anims.isPlaying;
      },
      to: 'adventurer-air-hold'
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.left,
      to: 'adventurer-air-draw',
      onTransition(entity) {
        entity.sprite.flipX = true;
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.right,
      to: 'adventurer-air-draw',
      onTransition(entity) {
        entity.sprite.flipX = false;
      }
    }
  ]
});
