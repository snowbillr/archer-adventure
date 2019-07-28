import { Adventurer } from '..';

import { baseAerial } from './base-aerial';
import { StateMerge } from '../../../components/phinite-state';

export const baseJump = StateMerge(baseAerial, {
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-jump-rise');
  },
});
