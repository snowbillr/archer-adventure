import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const stun: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-stun',
  onEnter(enemy) {
    const sprite = enemy.components[SpriteComponent.tag].sprite;
    sprite.anims.stop();

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
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(enemy) {
        const sprite = enemy.components[SpriteComponent.tag].sprite;

        return !sprite.scene.tweens.isTweening(sprite);
      },
      to: 'enemy-idle',
    }
  ],
}
