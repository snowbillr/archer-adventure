import 'phaser';

import { BaseScene } from '../scenes/base-scene';

export class ShootsArrowsSystem implements SystemsManager.System {
  static SystemTags = {
    shootsArrows: 'shootsArrows',
  };

  private scene: BaseScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
  }

  registerEntity(entity: Systems.ShootsArrows.Entity, data: SystemsManager.EntityRegistrationData): void {
    entity.minShotPower = 300;
    entity.maxShotPower = 700;
    entity.shotChargeRate = 15;
    entity.shotPower = entity.minShotPower;

    entity.arrows = [];
    for (let i = 0; i < 3; i++) {
      const arrow = this.scene.entityManager.createPrefab('arrow', {}, 2, entity.sprite.depth, 0, 0) as Entities.Arrow;
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

        let power = Phaser.Math.Clamp(entity.shotPower, entity.minShotPower, entity.maxShotPower);
        if (entity.sprite.flipX) {
          power *= -1;
        }
        availableArrow.body.setVelocity(power, 0);
        availableArrow.body.setGravityY(-500); // entity gravity = world gravity + this

        entity.shotPower = entity.minShotPower;
      } else {
        throw new Error('ShootsArrows::shootArrow::NO_AVAILABLE_ARROWS')
      }
    }
  }

  destroy(entity: Systems.ShootsArrows.Entity) {
    entity.arrows = [];
  }
}
