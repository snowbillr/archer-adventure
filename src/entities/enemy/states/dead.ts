import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { HurtboxComponent } from '../../../components/hurtbox-component';

export const dead: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-dead',
  onEnter(enemy) {
    const sprite = enemy.components[SpriteComponent.tag].sprite;

    enemy.components[PhysicsBodyComponent.tag].body.enable = false;
    enemy.components[HurtboxComponent.tag].disable();

    sprite.scene.tweens.add({
      targets: [sprite],
      props: {
        alpha: 0,
      },
      duration: 100,
      yoyo: true,
      repeat: 1,
      onComplete() {
        sprite.active = false;
        sprite.visible = false;
      }
    })
  },
  transitions: [],
}
