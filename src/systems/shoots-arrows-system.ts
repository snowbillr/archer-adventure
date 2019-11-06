import 'phaser';

import { BaseScene } from '../scenes/base-scene';

const ARROW_POOL_COUNT = 3;

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
    for (let i = 0; i < ARROW_POOL_COUNT; i++) {
      const arrow = this.scene.entityManager.createPrefab('arrow', {}, 2, entity.sprite.depth, 0, 0) as Entities.Arrow;
      arrow.phiniteStateMachine.doTransition({ to: 'arrow-disabled' });
      entity.arrows.push(arrow);
    }

    entity.shootArrow = () => {
      const availableArrow = this.getAvailableArrow(entity);

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
    }
  }

  destroy(entity: Systems.ShootsArrows.Entity) {
    entity.arrows = [];
  }

  private getAvailableArrow(entity: Systems.ShootsArrows.Entity) {
    const disabledArrows = entity.arrows
      .filter(arrow => arrow.phiniteStateMachine.currentState.id === 'arrow-disabled');
    const hitArrows = entity.arrows
      .filter(arrow => arrow.phiniteStateMachine.currentState.id === 'arrow-hit')

    if (disabledArrows.length) {
      console.log('disabled one')
      return disabledArrows[0];
    } else if (hitArrows.length) {
      console.log('hit one')
      return hitArrows[0];
    } else {
      throw new Error('ShootsArrows::shootArrow::NO_AVAILABLE_ARROWS')
    }
  }
}
