import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { ZoneBoundaryComponent } from '../../../components/zone-boundary-component';

export const walkRight: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'sheep-walk-right',
  onEnter(sheep: Phecs.Entity) {
    sheep.getComponent(SpriteComponent).sprite.anims.play('sheep-walk');
    sheep.getComponent(SpriteComponent).sprite.flipX = false;

    sheep.getComponent(PhysicsBodyComponent).body.velocity.x = 50;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(sheep: Phecs.Entity) {
        const sprite = sheep.getComponent(SpriteComponent).sprite;
        const zone = sheep.getComponent(ZoneBoundaryComponent).zone;

        return (sprite.x + sprite.width) > (zone.x + zone.width);
      },
      to: 'sheep-walk-left'
    }
  ]
}
