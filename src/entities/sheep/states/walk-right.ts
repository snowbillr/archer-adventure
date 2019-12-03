import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { ZoneBoundaryComponent } from '../../../components/zone-boundary-component';

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
        const sprite = sheep.components[SpriteComponent.tag].sprite;
        const zone = sheep.components[ZoneBoundaryComponent.tag].zone;

        return (sprite.x + sprite.width) > (zone.x + zone.width);
      },
      to: 'sheep-walk-left'
    }
  ]
}
