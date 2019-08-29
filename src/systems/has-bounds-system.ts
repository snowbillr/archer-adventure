import 'phaser';

import { BaseSystem } from '../lib/base-system';

export class HasBoundsSystem<T extends (Systems.HasBounds.Entity & Systems.HasPhysicalSprite.Entity)> extends BaseSystem<T> implements Systems.System {
  static SystemTags = {
    hasBounds: 'hasBounds',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasBoundsSystem.SystemTags.hasBounds, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: Systems.EntityRegistrationData): void {
    entity.boundsFrames = this.scene.cache.json.get(data.boundsKey);
  }

  update(tagManager: Systems.SystemsManager) {
    super.update(tagManager);

    const entities = this.tag1s;
    entities.forEach(entity => {
      const key = entity.sprite.frame.texture.key;
      const frame = entity.sprite.frame.name;

      const boundsFrame: Systems.HasBounds.Frame = entity.boundsFrames.find((b: Systems.HasBounds.Frame) => b.key === key && b.frame === frame) as Systems.HasBounds.Frame;
      if (boundsFrame) {
        const bounds: Systems.HasBounds.Bounds = boundsFrame.bounds;

        let offsetX = bounds.offset.x;
        let offsetY = bounds.offset.y;
        if (entity.sprite.flipX) {
          offsetX = entity.sprite.width - offsetX - bounds.size.width;
        }
        if (entity.sprite.flipY) {
          offsetY = entity.sprite.height - offsetY - bounds.size.height;
        }

        entity.body.setSize(bounds.size.width, bounds.size.height);
        entity.body.setOffset(offsetX, offsetY);
      } else {
        entity.body.setSize(entity.sprite.width, entity.sprite.height);
        entity.body.setOffset(0, 0);
      }

      entity.body.updateBounds();
    });
  }
}
