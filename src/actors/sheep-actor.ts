import { ScriptAction } from "../lib/showrunner/script-action";
import { PhiniteStateMachineComponent } from "../components/phinite-state-machine-component";
import { SpriteComponent } from "../components/sprite-component";
import { SayComponent } from "../components/say-component";

export class SheepActor {
  private scene: Phaser.Scene;
  private sheep: Phecs.Entity;

  constructor(scene: Phaser.Scene, sheep: Phecs.Entity) {
    this.scene = scene;
    this.sheep = sheep;
  }

  disablePhSM() {
    return new ScriptAction(() => {
      this.sheep.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.disable();

      return Promise.resolve();
    });
  }

  enablePhSM() {
    return new ScriptAction(() => {
      this.sheep.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.enable();

      return Promise.resolve();
    });
  }

  faceLeft() {
    return new ScriptAction(() => {
      this.sheep.getComponent(SpriteComponent).sprite.flipX = true;

      return Promise.resolve();
    });
  }

  shout(text: string) {
    return new ScriptAction(() => {
      return new Promise(resolve => {
        this.sheep.getComponent(SayComponent).shout(text, 900, resolve);
      });
    });
  }
}
