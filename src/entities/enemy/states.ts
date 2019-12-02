import { idle } from './states/idle';
import { dead } from './states/dead';
import { stun } from './states/stun';
import { jump } from './states/jump';

export const enemyStates: PhiniteStateMachine.States.State<Phecs.Entity>[] = [
  idle,
  stun,
  dead,
  jump,
];
