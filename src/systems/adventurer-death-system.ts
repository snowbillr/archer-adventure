import { EntityManager } from '../lib/phecs/entity-manager';
import { BaseScene } from '../scenes/base-scene';
import { PERSISTENCE_KEYS } from '../constants/persistence-keys';
import { SCENE_KEYS } from '../constants/scene-keys';

export class AdventurerDeathSystem implements Phecs.System {
  private scene: BaseScene;

  private healthListenerCleanupFn?: () => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
  }

  start(phEntities: EntityManager) {
    this.healthListenerCleanupFn = this.scene.persistence.onChange<number>(PERSISTENCE_KEYS.adventurer.health, health => {
      if (health <= 0) {
        this.scene.scene.stop(SCENE_KEYS.hud);
        this.scene.scene.pause(SCENE_KEYS.exploration);
        this.scene.scene.launch(SCENE_KEYS.death, {
          respawnAreaKey: this.scene.areaManager.currentAreaKey,
        });
      }
    });
  }

  stop() {
    if (this.healthListenerCleanupFn) {
      this.healthListenerCleanupFn();
    }
    delete this.healthListenerCleanupFn;
  }
}
