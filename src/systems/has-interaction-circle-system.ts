import 'phaser';
import { SpriteComponent } from '../components/sprite-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasInteracionCircleSystem implements Phecs.System {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  update(phEntities: EntityManager) {
    const entities: Phecs.Entity[] = phEntities.getEntitiesByComponent(InteractionCircleComponent);

    for (let entity of entities) {
      this.syncInteractionCircleToEntity(entity);
      this.syncDebugCircle(entity);
    };

    for (let entity of entities) {
      const intersectingEntityIds = this.getIntersectingInteractionIds(entity, entities);

      entity.getComponent(InteractionCircleComponent).interactionTracker.update(intersectingEntityIds);
    };
  }

  private syncInteractionCircleToEntity(entity: Phecs.Entity) {
    const sprite = entity.getComponent(SpriteComponent).sprite;
    entity.getComponent(InteractionCircleComponent).interactionCircle.setPosition(sprite.x, sprite.y);
  }

  private getIntersectingInteractionIds(entity: Phecs.Entity, allEntities: Phecs.Entity[]): string[] {
    return allEntities
      .filter(otherEntity => otherEntity.id !== entity.id)
      .filter(otherEntity => {
        const circle1 = entity.getComponent(InteractionCircleComponent).interactionCircle;
        const circle2 = otherEntity.getComponent(InteractionCircleComponent).interactionCircle;

        return Phaser.Geom.Intersects.CircleToCircle(circle1, circle2);
      })
      .map(otherEntity => otherEntity.id);
  }

  private syncDebugCircle(entity: Phecs.Entity) {
    const debugInteractionCircle = entity.getComponent(InteractionCircleComponent).debugInteractionCircle;
    if (debugInteractionCircle) {
      const sprite = entity.getComponent(SpriteComponent).sprite;
      const position = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main) as { x: number, y: number };
      debugInteractionCircle.setPosition(sprite.x, sprite.y);

      if (Phaser.Geom.Intersects.CircleToCircle(entity.getComponent(InteractionCircleComponent).interactionCircle, new Phaser.Geom.Circle(position.x, position.y, 1))) {
        debugInteractionCircle.setFillStyle(0xFF0000, 0.5);
      } else {
        debugInteractionCircle.setFillStyle(0x00FF00, 0.5);
      }
    }
  }
}
