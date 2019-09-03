import 'phaser';

export class HasSpriteSystem implements SystemsManager.System {
  static SystemTags = {
    hasSprite: 'hasSprite',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.HasSprite.Entity, data: SystemsManager.EntityRegistrationData): void {
    const { x, y, texture, frame } = data;
    const sprite = this.scene.add.sprite(x, y, texture, frame);

    // needed because the tiled map puts the position at the bottom of the sprite
    sprite.y -= sprite.height;

    if (data.scale) {
      sprite.setScale(data.scale);
    }

    entity.sprite = sprite;
  }

  destroy(entity: Systems.HasSprite.Entity) {
    entity.sprite.destroy();

    delete entity.sprite;
  }
}
