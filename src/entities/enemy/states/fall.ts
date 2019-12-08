import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const fall: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-fall',
  onEnter(enemy) {
    enemy.getComponent(SpriteComponent).sprite.anims.play('enemy-jump');
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(enemy) {
        const body = enemy.getComponent(PhysicsBodyComponent).body;

        return body.blocked.down;
      },
      to: 'enemy-idle',
    }
  ],
}
