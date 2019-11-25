import 'phaser';
import { SpriteComponent } from '../components/sprite-component';

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
      const key = entity.components[SpriteComponent.tag].sprite.frame.texture.key;
      const frame = entity.components[SpriteComponent.tag].sprite.frame.name;

      const boundsFrame: Systems.HasBounds.Frame = entity.boundsFrames.find((b: Systems.HasBounds.Frame) => b.key === key && b.frame === frame) as Systems.HasBounds.Frame;
      if (boundsFrame) {
        const bounds: Systems.HasBounds.Bounds = boundsFrame.bounds;

        const offset = {
          x: bounds.offset.x,
          y: bounds.offset.y,
        }
        if (entity.components[SpriteComponent.tag].sprite.flipX) {
          offset.x = entity.components[SpriteComponent.tag].sprite.width - bounds.offset.x - bounds.size.width;
        }
        if (entity.components[SpriteComponent.tag].sprite.flipY) {
          offset.y = entity.components[SpriteComponent.tag].sprite.height - bounds.offset.y - bounds.size.height;
        }

        // I have no idea why this needs the `scale` part, but it does
        const rotationPoint = {
          x: entity.components[SpriteComponent.tag].sprite.displayWidth * entity.components[SpriteComponent.tag].sprite.originX / entity.components[SpriteComponent.tag].sprite.scale,
          y: entity.components[SpriteComponent.tag].sprite.displayHeight * entity.components[SpriteComponent.tag].sprite.originY / entity.components[SpriteComponent.tag].sprite.scale,
        }
        Phaser.Math.RotateAround(offset, rotationPoint.x, rotationPoint.y, entity.components[SpriteComponent.tag].sprite.rotation);

        entity.body.setSize(bounds.size.width, bounds.size.height);
        entity.body.setOffset(offset.x, offset.y);
      } else {
        entity.body.setSize(entity.components[SpriteComponent.tag].sprite.width, entity.components[SpriteComponent.tag].sprite.height);
        entity.body.setOffset(0, 0);
      }

      entity.body.updateBounds();
    });
  }

  destroy(entity: Systems.HasBounds.Entity) {
    delete entity.boundsFrames;
  }
}
