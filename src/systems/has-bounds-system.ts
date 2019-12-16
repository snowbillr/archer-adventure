import 'phaser';
import { SpriteComponent } from '../components/sprite-component';
import { PhysicsBodyComponent } from '../components/physics-body-component';
import { BoundsComponent } from '../components/bounds-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasBoundsSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities = phEntities.getEntities(BoundsComponent);

    entities.forEach(entity => {
      const key = entity.getComponent(SpriteComponent).sprite.frame.texture.key;
      const frame = entity.getComponent(SpriteComponent).sprite.frame.name;

      const boundsFrame: Systems.HasBounds.Frame = entity.getComponent(BoundsComponent).boundsFrames.find((b: Systems.HasBounds.Frame) => b.key === key && b.frame === frame) as Systems.HasBounds.Frame;
      if (boundsFrame) {
        const bounds: Systems.HasBounds.Bounds = boundsFrame.bounds;

        const offset = {
          x: bounds.offset.x,
          y: bounds.offset.y,
        }
        if (entity.getComponent(SpriteComponent).sprite.flipX) {
          offset.x = entity.getComponent(SpriteComponent).sprite.width - bounds.offset.x - bounds.size.width;
        }
        if (entity.getComponent(SpriteComponent).sprite.flipY) {
          offset.y = entity.getComponent(SpriteComponent).sprite.height - bounds.offset.y - bounds.size.height;
        }

        // I have no idea why this needs the `scale` part, but it does
        const rotationPoint = {
          x: entity.getComponent(SpriteComponent).sprite.displayWidth * entity.getComponent(SpriteComponent).sprite.originX / entity.getComponent(SpriteComponent).sprite.scale,
          y: entity.getComponent(SpriteComponent).sprite.displayHeight * entity.getComponent(SpriteComponent).sprite.originY / entity.getComponent(SpriteComponent).sprite.scale,
        }
        Phaser.Math.RotateAround(offset, rotationPoint.x, rotationPoint.y, entity.getComponent(SpriteComponent).sprite.rotation);

        entity.getComponent(PhysicsBodyComponent).body.setSize(bounds.size.width, bounds.size.height);
        entity.getComponent(PhysicsBodyComponent).body.setOffset(offset.x, offset.y);
      } else {
        entity.getComponent(PhysicsBodyComponent).body.setSize(entity.getComponent(SpriteComponent).sprite.width, entity.getComponent(SpriteComponent).sprite.height);
        entity.getComponent(PhysicsBodyComponent).body.setOffset(0, 0);
      }

      entity.getComponent(PhysicsBodyComponent).body.updateBounds();
    });
  }
}
