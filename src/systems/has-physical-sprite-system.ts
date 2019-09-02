import 'phaser';

import { BaseSystem } from '../lib/systems/base-system';

export class HasPhysicalSpriteSystem<T extends Systems.HasPhysicalSprite.Entity> extends BaseSystem<T> implements SystemsManager.System {
  static SystemTags = {
    hasPhysicalSprite: 'hasPhysicalSprite',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasPhysicalSpriteSystem.SystemTags.hasPhysicalSprite, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: SystemsManager.EntityRegistrationData): void {
    const { x, y, texture, frame } = data;
    const sprite = this.scene.physics.add.sprite(x, y, texture, frame);

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
}
