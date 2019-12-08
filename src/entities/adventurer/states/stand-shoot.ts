import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';
import { ShootsArrowsComponent } from '../../../components/shoots-arrows-component';

export const adventurerStandShoot: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseIdle, {
  id: 'adventurer-stand-shoot',
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-stand-shoot');
  },
  onLeave(entity) {
    entity.getComponent(ShootsArrowsComponent).shootArrow();
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity: Phecs.Entity) {
        return !entity.getComponent(SpriteComponent).sprite.anims.isPlaying;
      },
      to(entity) {
        const controls = entity.getComponent(AdventurerComponent).controls;

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
