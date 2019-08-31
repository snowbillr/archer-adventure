import 'phaser';

import { BaseSystem } from '../lib/systems/base-system';

export class HasIndicatorSystem<T extends Systems.HasIndicator.Entity> extends BaseSystem<T> implements SystemsManager.System {
  static SystemTags = {
    hasIndicator: 'hasIndicator',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasIndicatorSystem.SystemTags.hasIndicator, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: SystemsManager.EntityRegistrationData): void {
    const { depth, targetX, targetY } = data;

    const indicatorSprite = this.scene.add.sprite(targetX, targetY, 'indicator-down');
    indicatorSprite.setScale(2);
    indicatorSprite.setDepth(depth);

    function showIndicator() {
      indicatorSprite.visible = true;
      indicatorSprite.active = true;
      indicatorSprite.anims.play('indicator-down', true);
    }

    function hideIndicator() {
      indicatorSprite.visible = false;
      indicatorSprite.active = false;
      indicatorSprite.anims.stop();
    }

    entity.showIndicator = showIndicator;
    entity.hideIndicator = hideIndicator;
  }
}
