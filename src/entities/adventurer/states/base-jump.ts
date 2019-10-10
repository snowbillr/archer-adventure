import { baseAerial } from './base-aerial';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const baseJump: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge<Entities.Adventurer>(baseAerial, {
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.anims.play('adventurer-jump-rise');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.attack,
      to: 'adventurer-air-draw',
    },
  ]
});
