import { walkLeft } from './states/walk-left';
import { walkRight } from './states/walk-right';

export const sheepStates: PhiniteStateMachine.States.State<Phecs.Entity>[] = [
  walkLeft,
  walkRight
];
