import { idle } from './states/idle';
import { walk } from './states/walk';

export const trainerStates: PhiniteStateMachine.States.State<Phecs.Entity>[] = [
  idle,
  walk,
];
