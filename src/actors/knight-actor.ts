import { ScriptAction } from "../lib/showrunner/script-action";
import { PhiniteStateMachineComponent } from "../components/phinite-state-machine-component";
import { SpriteComponent } from "../components/sprite-component";

export class KnightActor {
  private scene: Phaser.Scene;
  private knight: Phecs.Entity;

  constructor(scene: Phaser.Scene, knight: Phecs.Entity) {
    this.scene = scene;
    this.knight = knight;

    console.log(this.knight.getComponent(SpriteComponent).sprite.x);
  }

  walkTo(x: number, duration: number) {
    return new ScriptAction(() => {
      return new Promise(resolve => {
        const sprite = this.knight.getComponent(SpriteComponent).sprite;
        sprite.flipX = x > sprite.x;
        sprite.anims.play('knight-run');

        this.scene.tweens.add({
          targets: sprite,
          props: {
            x
          },
          duration: duration,
          onComplete: () => {
            sprite.anims.play('knight-ready');
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

        sprite.anims.play('knight-attack');

        sprite.on(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, resolve);
      });
    });
  }

  idle() {
    return new ScriptAction(() => {
      this.knight.getComponent(SpriteComponent).sprite.anims.play('knight-idle');

      return Promise.resolve();
    });
  }
}
