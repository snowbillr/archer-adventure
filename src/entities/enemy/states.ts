import { idle } from './states/idle';
import { dead } from './states/dead';

export const enemyStates: PhiniteStateMachine.States.State<Phecs.Entity>[] = [
  idle,
  dead,
];
