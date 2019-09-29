import { flying } from './states/flying';
import { hit } from './states/hit';
import { disabled } from './states/disabled';

export const arrowStates: PhiniteStateMachine.States.State<Entities.Arrow>[] = [
  flying,
  hit,
  disabled,
];
