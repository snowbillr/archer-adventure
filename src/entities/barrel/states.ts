import { idle } from './states/idle';
import { destroyed } from './states/destroyed';
import { disabled } from './states/disabled';

export const barrelStates: PhiniteStateMachine.States.State<Phecs.Entity>[] = [
  idle,
  destroyed,
  disabled,
];
