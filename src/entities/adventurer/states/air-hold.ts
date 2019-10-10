import { baseAerial } from './base-aerial';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerAirHold: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge<Entities.Adventurer>(baseAerial, {
  id: 'adventurer-air-hold',
  onEnter(entity) {
    entity.sprite.anims.play('adventurer-air-hold', true);
  },
  onUpdate(entity) {
    entity.shotPower += entity.shotChargeRate;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity) {
        return entity.body.blocked.down;
      },
      to: 'adventurer-stand-hold',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.codes.attack,
      to: 'adventurer-air-shoot',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.left,
      to: 'adventurer-air-hold',
      onTransition(entity) {
        entity.sprite.flipX = true;
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.right,
      to: 'adventurer-air-hold',
      onTransition(entity) {
        entity.sprite.flipX = false;
      }
    }
  ]
});
