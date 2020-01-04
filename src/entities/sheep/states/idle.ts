import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const idle: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'sheep-idle',
  onEnter(sheep: Phecs.Entity) {
    sheep.getComponent(PhysicsBodyComponent).body.setVelocity(0);
    sheep.getComponent(SpriteComponent).sprite.anims.stop();
  },
  transitions: [
    {
      type: TransitionType.Timer,
      delay: () => Phaser.Math.RND.between(1000, 1500),
      to() {
        return Phaser.Math.RND.pick(['sheep-walk-left', 'sheep-walk-right']);
      }
    },
  ]
}
