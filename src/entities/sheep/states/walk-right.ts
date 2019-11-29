import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { AreaBoundaryComponent } from '../../../components/area-boundary-component';

export const walkRight: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'sheep-walk-right',
  onEnter(sheep: Phecs.Entity) {
    sheep.components[SpriteComponent.tag].sprite.anims.play('sheep-walk');
    sheep.components[SpriteComponent.tag].sprite.flipX = false;

    sheep.components[PhysicsBodyComponent.tag].body.velocity.x = 50;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(sheep: Phecs.Entity) {
        return sheep.components[SpriteComponent.tag].sprite.x > sheep.components[AreaBoundaryComponent.tag].areaBoundary.right;
      },
      to: 'sheep-walk-left'
    }
  ]
}
