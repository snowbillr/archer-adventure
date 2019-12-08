import { idle } from './states/idle';
import { dead } from './states/dead';
import { stun } from './states/stun';
import { jump } from './states/jump';
import { trackAdventurer } from './states/track-adventurer';
import { fall } from './states/fall';
import { wander } from './states/wander';
import { jumpPrep } from './states/jump-prep';

export const enemyStates: PhiniteStateMachine.States.State<Phecs.Entity>[] = [
  idle,
  stun,
  dead,
  jumpPrep,
  jump,
  fall,
  trackAdventurer,
  wander,
];
