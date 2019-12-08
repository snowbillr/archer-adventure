import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { HurtboxComponent } from '../../../components/hurtbox-component';
import { SceneComponent } from '../../../components/scene-component';

export const dead: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-dead',
  onEnter(enemy) {
    const sprite = enemy.getComponent(SpriteComponent).sprite;
    sprite.anims.stop();

    enemy.getComponent(PhysicsBodyComponent).body.enable = false;
    enemy.getComponent(HurtboxComponent).disable();

    enemy.getComponent(SceneComponent).scene.tweens.add({
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
