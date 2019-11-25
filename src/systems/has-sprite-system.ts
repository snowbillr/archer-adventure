import 'phaser';

export class HasSpriteSystem implements SystemsManager.System {
  static SystemTags = {
    hasSprite: 'hasSprite',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  destroy(entity: Systems.HasSprite.Entity) {
    entity.sprite.destroy();

    delete entity.sprite;
  }
}
