import 'phaser';

export class HasPhysicalSpriteSystem implements SystemsManager.System {
  static SystemTags = {
    hasPhysicalSprite: 'hasPhysicalSprite',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  destroy(entity: Systems.HasPhysicalSprite.Entity) {
    entity.sprite.destroy();

    delete entity.sprite;
  }
}
