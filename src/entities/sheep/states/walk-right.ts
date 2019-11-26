import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { AreaBoundaryComponent } from '../../../components/area-boundary-component';

export const walkRight: PhiniteStateMachine.States.State<Entities.Sheep> = {
  id: 'sheep-walk-right',
  onEnter(sheep: Entities.Sheep) {
    sheep.components[SpriteComponent.tag].sprite.anims.play('sheep-walk');
    sheep.components[SpriteComponent.tag].sprite.flipX = false;

    sheep.components[PhysicsBodyComponent.tag].body.velocity.x = 50;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(sheep: Entities.Sheep) {
        return sheep.components[SpriteComponent.tag].sprite.x > sheep.components[AreaBoundaryComponent.tag].areaBoundary.right;
      },
      to: 'sheep-walk-left'
    }
  ]
}
