import 'phaser';

export class HasIndicatorSystem implements SystemsManager.System {
  static SystemTags = {
    hasIndicator: 'hasIndicator',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.HasIndicator.Entity, data: SystemsManager.EntityRegistrationData): void {
    let { x, y } = data;
    y = y - entity.sprite.displayHeight - 20;

    const indicatorSprite = this.scene.add.sprite(x, y, 'indicator-down');
    if (data.scale) {
      indicatorSprite.setScale(data.scale);
    }

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
