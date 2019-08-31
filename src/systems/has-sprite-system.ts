import 'phaser';

import { BaseSystem } from '../lib/systems/base-system';

export class HasSpriteSystem<T extends Systems.HasSprite.Entity> extends BaseSystem<T> implements SystemsManager.System {
  static SystemTags = {
    hasSprite: 'hasSprite',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasSpriteSystem.SystemTags.hasSprite, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: SystemsManager.EntityRegistrationData): void {
    const { x, y, texture, frame } = data;
    const sprite = this.scene.add.sprite(x, y, texture, frame);

    if (data.scale) {
      sprite.setScale(data.scale);
    }

    entity.sprite = sprite;
  }
}
