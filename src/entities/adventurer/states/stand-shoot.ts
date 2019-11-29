import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';
import { ShootsArrowsComponent } from '../../../components/shoots-arrows-component';

export const adventurerStandShoot: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseIdle, {
  id: 'adventurer-stand-shoot',
  onEnter(entity: Entities.Adventurer) {
    entity.components[SpriteComponent.tag].sprite.anims.play('adventurer-stand-shoot');
  },
  onLeave(entity) {
    entity.components[ShootsArrowsComponent.tag].shootArrow();
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity: Entities.Adventurer) {
        return !entity.components[SpriteComponent.tag].sprite.anims.isPlaying;
      },
      to(entity) {
        const controls = entity.components[AdventurerComponent.tag].controls;

        if (controls.right.isDown) {
          return 'adventurer-run-right';
        } else if (controls.left.isDown) {
          return 'adventurer-run-left';
        } else {
          return 'adventurer-stand';
        }
      }
    },
  ]
});
