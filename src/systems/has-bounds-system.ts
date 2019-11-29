import 'phaser';
import { SpriteComponent } from '../components/sprite-component';
import { PhysicsBodyComponent } from '../components/physics-body-component';
import { BoundsComponent } from '../components/bounds-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasBoundsSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities = phEntities.getEntitiesByTag(BoundsComponent.tag);

    entities.forEach(entity => {
      const key = entity.components[SpriteComponent.tag].sprite.frame.texture.key;
      const frame = entity.components[SpriteComponent.tag].sprite.frame.name;

      const boundsFrame: Systems.HasBounds.Frame = entity.components[BoundsComponent.tag].boundsFrames.find((b: Systems.HasBounds.Frame) => b.key === key && b.frame === frame) as Systems.HasBounds.Frame;
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

        entity.components[PhysicsBodyComponent.tag].body.setSize(bounds.size.width, bounds.size.height);
        entity.components[PhysicsBodyComponent.tag].body.setOffset(offset.x, offset.y);
      } else {
        entity.components[PhysicsBodyComponent.tag].body.setSize(entity.components[SpriteComponent.tag].sprite.width, entity.components[SpriteComponent.tag].sprite.height);
        entity.components[PhysicsBodyComponent.tag].body.setOffset(0, 0);
      }

      entity.components[PhysicsBodyComponent.tag].body.updateBounds();
    });
  }
}
