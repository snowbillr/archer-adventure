import 'phaser';

import { BaseSystem } from './base-system';

export class HasBoundsSystem<T extends (Systems.HasBounds & Systems.HasPhysicalSprite)> extends BaseSystem<T> implements Tags.TagSystem {
  static SystemTags = {
    hasBounds: 'hasBounds',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasBoundsSystem.SystemTags.hasBounds, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: Tags.EntityRegistrationData): void {
    entity.boundsFrames = this.scene.cache.json.get(data.boundsKey);
  }

  update(tagManager: Tags.TagManager) {
    super.update(tagManager);

    const entities = this.tag1s;
    entities.forEach(entity => {
      const key = entity.sprite.frame.texture.key;
      const frame = entity.sprite.frame.name;

      const boundsFrame: Systems.HasBoundsFrame = entity.boundsFrames.find((b: Systems.HasBoundsFrame) => b.key === key && b.frame === frame) as Systems.HasBoundsFrame;
      if (boundsFrame) {
        const bounds: Systems.HasBoundsBounds = boundsFrame.bounds;

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
