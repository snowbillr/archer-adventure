import { walkLeft } from './states/walk-left';
import { walkRight } from './states/walk-right';
import { idle } from './states/idle';

export const sheepStates: PhiniteStateMachine.States.State<Phecs.Entity>[] = [
  idle,
  walkLeft,
  walkRight
];
