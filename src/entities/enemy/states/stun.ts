import { SpriteComponent } from '../../../components/sprite-component';
import { PhiniteStateMachineComponent } from '../../../components/phinite-state-machine-component';

export const stun: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-stun',
  onEnter(enemy) {
    const sprite = enemy.components[SpriteComponent.tag].sprite;
    sprite.anims.stop();
    sprite.setFrame(0);

    sprite.scene.tweens.add({
      targets: [sprite],
      props: {
        alpha: 0,
      },
      duration: 200,
      yoyo: true,
      onComplete() {
        enemy.components[PhiniteStateMachineComponent.tag]
          .phiniteStateMachine
          .doTransition({ to: 'enemy-idle' });
      }
    })
  },
  transitions: [],
}
