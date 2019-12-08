import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { ZoneBoundaryComponent } from '../../../components/zone-boundary-component';

export const walkLeft: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'sheep-walk-left',
  onEnter(sheep: Phecs.Entity) {
    sheep.getComponent(SpriteComponent).sprite.anims.play('sheep-walk');
    sheep.getComponent(SpriteComponent).sprite.flipX = true;

    sheep.getComponent(PhysicsBodyComponent).body.velocity.x = -50;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(sheep: Phecs.Entity) {
        const sprite = sheep.getComponent(SpriteComponent).sprite;
        const zone = sheep.getComponent(ZoneBoundaryComponent).zone;

        return (sprite.x) < (zone.x);
      },
      to: 'sheep-walk-right'
    }
  ]
}
