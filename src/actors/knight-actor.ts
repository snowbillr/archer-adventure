import { ScriptAction } from "../lib/showrunner/script-action";
import { SpriteComponent } from "../components/sprite-component";

export class KnightActor {
  private scene: Phaser.Scene;
  private knight: Phecs.Entity;

  constructor(scene: Phaser.Scene, knight: Phecs.Entity) {
    this.scene = scene;
    this.knight = knight;
  }

  walkTo(x: number, duration: number) {
    return new ScriptAction(() => {
      return new Promise(resolve => {
        const sprite = this.knight.getComponent(SpriteComponent).sprite;
        sprite.flipX = x < sprite.x;
        sprite.anims.play('knight2-run');

        this.scene.tweens.add({
          targets: sprite,
          props: {
            x
          },
          duration: duration,
          onComplete: () => {
            sprite.anims.play('knight2-ready');
            resolve();
          }
        });
      })
    });
  }

  swing() {
    return new ScriptAction(() => {
      return new Promise(resolve => {
        const sprite = this.knight.getComponent(SpriteComponent).sprite;
        sprite.y -= 20;

        sprite.anims.play('knight2-attack-vertical');

        sprite.on(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, resolve);
      });
    });
  }

  idle() {
    return new ScriptAction(() => {
      this.knight.getComponent(SpriteComponent).sprite.anims.play('knight2-ready');

      return Promise.resolve();
    });
  }
}
