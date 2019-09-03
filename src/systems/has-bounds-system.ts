import 'phaser';

export class HasBoundsSystem implements SystemsManager.System {
  static SystemTags = {
    hasBounds: 'hasBounds',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.HasBounds.Entity, data: SystemsManager.EntityRegistrationData): void {
    entity.boundsFrames = this.scene.cache.json.get(data.boundsKey);
  }

  update(tagManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasBounds.Entity[] = tagManager.getEntities(HasBoundsSystem.SystemTags.hasBounds);

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

  destroy(entity: Systems.HasBounds.Entity) {
    delete entity.boundsFrames;
  }
}
