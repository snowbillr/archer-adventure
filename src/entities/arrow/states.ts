import { flying } from './states/flying';
import { hit } from './states/hit';

export const arrowStates: PhiniteStateMachine.States.State<Entities.Arrow>[] = [
  flying,
  hit
];
