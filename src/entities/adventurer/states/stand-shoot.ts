import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerStandShoot: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseIdle, {
  id: 'adventurer-stand-shoot',
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.anims.play('adventurer-stand-shoot');
  },
  onLeave(entity) {
    entity.shootArrow();
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity: Entities.Adventurer) {
        return !entity.sprite.anims.isPlaying;
      },
      to(entity) {
        if (entity.controls.right.isDown) {
          return 'adventurer-run-right';
        } else if (entity.controls.left.isDown) {
          return 'adventurer-run-left';
        } else {
          return 'adventurer-stand';
        }
      }
    },
  ]
});
