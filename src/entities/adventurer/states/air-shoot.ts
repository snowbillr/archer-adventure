import { baseAerial } from './base-aerial';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { ShootsArrowsComponent } from '../../../components/shoots-arrows-component';

export const adventurerAirShoot: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge<Phecs.Entity>(baseAerial, {
  id: 'adventurer-air-shoot',
  onEnter(entity) {
    entity.components[SpriteComponent.tag].sprite.anims.play('adventurer-air-shoot');
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity: Phecs.Entity) {
        return entity.components[PhysicsBodyComponent.tag].body.blocked.down;
      },
      to: 'adventurer-stand-shoot',
    },
    {
      type: TransitionType.Conditional,
      condition(entity: Phecs.Entity) {
        return !entity.components[SpriteComponent.tag].sprite.anims.isPlaying;
      },
      to(entity) {
        if (entity.components[PhysicsBodyComponent.tag].body.velocity.y < 0) {
          return 'adventurer-jump';
        } else {
          return 'adventurer-fall';
        }
      },
      onTransition(entity) {
        entity.components[ShootsArrowsComponent.tag].shootArrow();
      }
    }
  ]
});
