import { baseAerial } from './base-aerial';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';

export const baseJump: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge<Entities.Adventurer>(baseAerial, {
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.anims.play('adventurer-jump-rise');
  },
});
