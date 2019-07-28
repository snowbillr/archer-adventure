import { TransitionType } from '../../components/phinite-state';
import { Adventurer } from './index';
import { movementAttributes } from './movement-attributes';

import { adventurerStand } from './states/stand';
import { adventurerCrouch } from './states/crouch';
import { adventurerRunRight } from './states/run-right';
import { adventurerRunLeft } from './states/run-left';
import { adventurerSlide } from './states/slide';
import { adventurerJump } from './states/jump';
import { adventurerFall } from './states/fall';
import { adventurerFallLeft } from './states/fall-left';
import { adventurerFallRight } from './states/fall-right';

export const states: PhiniteState.State<Adventurer>[] = [
  adventurerStand,
  adventurerCrouch,

  adventurerRunRight,
  adventurerRunLeft,

  adventurerSlide,

  adventurerJump,

  adventurerFall,
  adventurerFallLeft,
  adventurerFallRight,
];
