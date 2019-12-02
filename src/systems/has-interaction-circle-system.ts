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
    const entities: Phecs.Entity[] = phEntities.getEntitiesByTag(InteractionCircleComponent.tag);

    for (let entity of entities) {
      entity.components[InteractionCircleComponent.tag].interactionCircle.setPosition(entity.components[SpriteComponent.tag].sprite.x, entity.components[SpriteComponent.tag].sprite.y);

      if (entity.components[InteractionCircleComponent.tag].debugInteractionCircle) {
        const position = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main) as { x: number, y: number };
        entity.components[InteractionCircleComponent.tag].debugInteractionCircle.setPosition(entity.components[SpriteComponent.tag].sprite.x, entity.components[SpriteComponent.tag].sprite.y);

        if (Phaser.Geom.Intersects.CircleToCircle(entity.components[InteractionCircleComponent.tag].interactionCircle, new Phaser.Geom.Circle(position.x, position.y, 1))) {
          entity.components[InteractionCircleComponent.tag].debugInteractionCircle.setFillStyle(0xFF0000, 0.5);
        } else {
          entity.components[InteractionCircleComponent.tag].debugInteractionCircle.setFillStyle(0x00FF00, 0.5);
        }
      }
    };

    /*
      * entering -> active -> exiting
    */
    for (let entity of entities) {
      const intersectingEntityIds = this.getIntersectingInteractionIds(entity, entities);

      entity.components[InteractionCircleComponent.tag].interactionTracker.update(intersectingEntityIds);
    };
  }

  private getIntersectingInteractionIds(entity: Phecs.Entity, allEntities: Phecs.Entity[]): string[] {
    return allEntities
      .filter(otherEntity => otherEntity.id !== entity.id)
      .filter(otherEntity => {
        const circle1 = entity.components[InteractionCircleComponent.tag].interactionCircle;
        const circle2 = otherEntity.components[InteractionCircleComponent.tag].interactionCircle;

        return Phaser.Geom.Intersects.CircleToCircle(circle1, circle2);
      })
      .map(otherEntity => otherEntity.id);
  }
}
