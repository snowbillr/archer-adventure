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
    entity.arrows = [];
    for (let i = 0; i < 2; i++) {
      const arrow = this.scene.entityManager.createPrefab('arrow', {}, 2, entity.sprite.depth, 0, 0) as Entities.Arrow;
      this.scene.physics.add.collider(arrow!.sprite, this.scene.areaManager.getTileLayer('ground')!);

      arrow.phiniteStateMachine.doTransition({ to: 'arrow-disabled' });
      entity.arrows.push(arrow);
    }

    entity.shootArrow = () => {
      let availableArrow = null;
      for (let arrow of entity.arrows.reverse()) {
        if (arrow.phiniteStateMachine.currentState.id != 'arrow-flying') {
          availableArrow = arrow;
          break;
        }
      }

      if (availableArrow) {
        availableArrow.phiniteStateMachine.doTransition({ to: 'arrow-flying' });

        availableArrow.sprite.x = entity.sprite.x;
        availableArrow.sprite.y = entity.sprite.y;
      } else {
        throw new Error('ShootsArrows::shootArrow::NO_AVAILABLE_ARROWS')
      }
    }
  }
}
