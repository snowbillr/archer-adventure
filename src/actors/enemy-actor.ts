import { ScriptAction } from "../lib/showrunner/script-action";
import { PhiniteStateMachineComponent } from "../components/phinite-state-machine-component";
import { SpriteComponent } from "../components/sprite-component";
import { PhiniteStateMachine } from "../lib/phinite-state-machine/phinite-state-machine";

export class EnemyActor {
  private scene: Phaser.Scene;
  private enemy: Phecs.Entity;

  constructor(scene: Phaser.Scene, enemy: Phecs.Entity) {
    this.scene = scene;
    this.enemy = enemy;
  }

  disablePhSM() {
    return new ScriptAction(() => {
      this.enemy.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.disable();

      return Promise.resolve();
    });
  }

  enablePhSM() {
    return new ScriptAction(() => {
      this.enemy.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.enable();

      return Promise.resolve();
    });
  }

  faceLeft() {
    return new ScriptAction(() => {
      this.enemy.getComponent(SpriteComponent).sprite.flipX = true;

      return Promise.resolve();
    });
  }

  die() {
    return new ScriptAction(() => {
      this.enemy.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.doTransition({ to: 'enemy-dead' });

      return Promise.resolve();
    });
  }
}
