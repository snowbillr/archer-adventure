import { ScriptAction } from "../lib/showrunner/script-action";
import { PhiniteStateMachineComponent } from "../components/phinite-state-machine-component";
import { SpriteComponent } from "../components/sprite-component";

export class AdventurerActor {
  private scene: Phaser.Scene;
  private adventurer: Phecs.Entity;

  constructor(scene: Phaser.Scene, adventurer: Phecs.Entity) {
    this.scene = scene;
    this.adventurer = adventurer;
  }

  disablePhSM() {
    return new ScriptAction(() => {
      this.adventurer.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.disable();

      return Promise.resolve();
    });
  }

  enablePhSM() {
    return new ScriptAction(() => {
      this.adventurer.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.enable();

      return Promise.resolve();
    });
  }

  faceRight() {
    return new ScriptAction(() => {
      this.adventurer.getComponent(SpriteComponent).sprite.flipX = false;

      return Promise.resolve();
    });
  }

  walk(distance: number) {
    return new ScriptAction(() => {
      return new Promise(resolve => {
        const sprite = this.adventurer.getComponent(SpriteComponent).sprite;

        if (distance < 0) {
          sprite.flipX = true;
        } else {
          sprite.flipX = false;
        }

        sprite.anims.play('adventurer-run');

        this.scene.tweens.add({
          targets: sprite,
          props: { x: sprite.x + distance },
          duration: 500,
          onComplete: () => {
            sprite.anims.play('adventurer-stand');
            resolve();
          },
        });
      });
    })
  }
}