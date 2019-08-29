import 'phaser';

import { BaseSystem } from '../lib/base-system';

export class HasPhysicalSpriteSystem<T extends Systems.HasPhysicalSprite> extends BaseSystem<T> implements Systems.System {
  static SystemTags = {
    hasPhysicalSprite: 'hasPhysicalSprite',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasPhysicalSpriteSystem.SystemTags.hasPhysicalSprite, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: { [key: string]: any }): void {
    const { x, y, texture, frame } = data;
    const sprite = this.scene.physics.add.sprite(x, y, texture, frame);

    if (data.scale) {
      sprite.setScale(data.scale);
    }

    entity.sprite = sprite;
    entity.body = sprite.body as Phaser.Physics.Arcade.Body;

    entity.body.maxVelocity.x = data.maxVelocity.x;
  }
}
