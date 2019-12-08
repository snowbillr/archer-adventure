import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

import { movementAttributes } from '../movement-attributes';

export const jump: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-jump',
  onEnter(enemy) {
    enemy.getComponent(SpriteComponent).sprite.anims.play('enemy-jump');

    enemy.getComponent(PhysicsBodyComponent).body.velocity.y = movementAttributes.jumpVelocity;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(enemy) {
        const body = enemy.getComponent(PhysicsBodyComponent).body;

        return body.velocity.y <= 0;
      },
      to: 'enemy-fall',
    }
  ],
}
