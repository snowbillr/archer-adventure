import { walkLeft } from './states/walk-left';

export const sheepStates: PhiniteStateMachine.States.State<Entities.Sheep>[] = [
  walkLeft
];
