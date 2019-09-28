import 'phaser';

import { BaseScene } from '../scenes/base-scene';

export class ShootsArrowsSystem implements SystemsManager.System {
  static SystemTags = {
    shootsArrows: 'shootsArrows',
  };

  private scene: BaseScene;

  constructor(scene: BaseScene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.ShootsArrows.Entity, data: SystemsManager.EntityRegistrationData): void {
    entity.shootArrow = (x, y, depth) => {
      const arrow = this.scene.entityManager.createPrefab('arrow', {}, 2, depth, x, y, false);
      this.scene.physics.add.collider(arrow.sprite, this.scene.areaManager.getTileLayer('ground')!);
    }
  }
}
