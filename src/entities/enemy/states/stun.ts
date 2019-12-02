import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const stun: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-stun',
  onEnter(enemy) {
    const sprite = enemy.components[SpriteComponent.tag].sprite;
    const body = enemy.components[PhysicsBodyComponent.tag].body;

    sprite.anims.stop();
    body.allowGravity = false;
    body.velocity.x = 0;
    body.velocity.y = 0;

    sprite.scene.tweens.timeline({
      tweens: [
        {
          targets: sprite,
          props: {
            alpha: 0.5,
          },
          duration: 100,
          completeDelay: 300,
        },
        {
          targets: sprite,
          props: {
            alpha: 1,
          },
          duration: 100,
        }
      ]
    });
  },
  onLeave(enemy) {
    const body = enemy.components[PhysicsBodyComponent.tag].body;

    body.allowGravity = true;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(enemy) {
        const sprite = enemy.components[SpriteComponent.tag].sprite;

        return !sprite.scene.tweens.isTweening(sprite);
      },
      to(enemy) {
        const body = enemy.components[PhysicsBodyComponent.tag].body;

        if (body.blocked.down) {
          return 'enemy-idle';
        } else {
          return 'enemy-fall';
        }
      }
    }
  ],
}
