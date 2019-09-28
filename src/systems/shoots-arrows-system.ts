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
    entity.shotArrows = [];
    entity.availableArrows = [];
    for (let i = 0; i < 2; i++) {
      const arrow = this.scene.entityManager.createPrefab('arrow', {}, 2, entity.sprite.depth, 0, 0) as Entities.Arrow;
      this.scene.physics.add.collider(arrow!.sprite, this.scene.areaManager.getTileLayer('ground')!);

      arrow.phiniteStateMachine.doTransition({ to: 'arrow-disabled' });
      entity.availableArrows.push(arrow);
    }

    entity.shootArrow = () => {
      if (entity.availableArrows.length) {
        const arrow = entity.availableArrows.pop() as Entities.Arrow;
        entity.shotArrows.push(arrow);

        arrow.phiniteStateMachine.doTransition({ to: 'arrow-flying' });

        arrow.sprite.x = entity.sprite.x;
        arrow.sprite.y = entity.sprite.y;
      } else {
        throw new Error('ShootsArrows::shootArrow::NO_AVAILABLE_ARROWS')
      }
    }

    entity.reclaimArrowIfRequired = () => {
      if (entity.availableArrows.length === 0) {
        const reclaimedArrow = entity.shotArrows.splice(0, 1)[0];
        reclaimedArrow.phiniteStateMachine.doTransition({ to: 'arrow-disabled' });

        entity.availableArrows.push(reclaimedArrow);
      }
    }
  }
}
