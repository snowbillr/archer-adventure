import { baseAerial } from './base-aerial';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const baseJump: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge<Phecs.Entity>(baseAerial, {
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-jump-rise');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.getComponent(AdventurerComponent).codes.attack,
      to: 'adventurer-air-draw',
    },
  ]
});
