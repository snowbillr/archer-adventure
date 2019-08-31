import { adventurerStand } from './states/stand';
import { adventurerCrouch } from './states/crouch';
import { adventurerRunRight } from './states/run-right';
import { adventurerRunLeft } from './states/run-left';
import { adventurerSlide } from './states/slide';
import { adventurerJumpPrep } from './states/jump-prep';
import { adventurerJump} from './states/jump';
import { adventurerJumpLeft } from './states/jump-left';
import { adventurerJumpRight } from './states/jump-right';
import { adventurerFall } from './states/fall';
import { adventurerFallLeft } from './states/fall-left';
import { adventurerFallRight } from './states/fall-right';

export const states: PhiniteStateMachine.States.State<Entities.Adventurer>[] = [
  adventurerStand,
  adventurerCrouch,

  adventurerRunRight,
  adventurerRunLeft,

  adventurerSlide,

  adventurerJumpPrep,
  adventurerJump,
  adventurerJumpLeft,
  adventurerJumpRight,

  adventurerFall,
  adventurerFallLeft,
  adventurerFallRight,
];
