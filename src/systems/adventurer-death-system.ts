import 'phaser';
import { AdventurerComponent } from '../components/adventurer-component';
import { EntityManager } from '../lib/phecs/entity-manager';
import { HealthComponent } from '../components/health-component';

export class AdventurerDeathSystem implements Phecs.System {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  start(phEntities: EntityManager) {
    const adventurer = phEntities.getEntitiesByComponent(AdventurerComponent)[0];

    adventurer.getComponent(HealthComponent).onDeath(() => {
      this.scene.scene.stop('ui');
      this.scene.scene.stop('exploration');
      this.scene.scene.start('death');
    });
  }
}
