import 'phaser';

export class HasPhysicalSpriteSystem implements SystemsManager.System {
  static SystemTags = {
    hasPhysicalSprite: 'hasPhysicalSprite',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.HasPhysicalSprite.Entity, data: SystemsManager.EntityRegistrationData): void {
    const { x, y, texture, frame } = data;
    const sprite = this.scene.physics.add.sprite(x, y, texture, frame);

    // needed because the tiled map puts the position at the bottom of the sprite
    sprite.y -= sprite.height;

    if (data.scale) {
      sprite.setScale(data.scale);
    }

    entity.sprite = sprite;
    entity.body = sprite.body as Phaser.Physics.Arcade.Body;

    if (data.maxVelocityX) {
      entity.body.maxVelocity.x = data.maxVelocityX;
    }
  }

  destroy(entity: Systems.HasPhysicalSprite.Entity) {
    entity.sprite.destroy();

    delete entity.sprite;
  }
}
