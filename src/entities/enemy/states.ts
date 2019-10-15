import { idle } from './states/idle';

export const enemyStates: PhiniteStateMachine.States.State<Entities.Enemy>[] = [
  idle,
];
