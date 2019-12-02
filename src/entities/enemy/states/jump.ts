import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const jump: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-jump',
  onEnter(enemy) {
    enemy.components[SpriteComponent.tag].sprite.anims.play('enemy-jump');

    enemy.components[PhysicsBodyComponent.tag].body.velocity.y = -350;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(enemy) {
        const body = enemy.components[PhysicsBodyComponent.tag].body;

        return body.blocked.down;
      },
      to: 'enemy-idle',
    }
  ],
}
