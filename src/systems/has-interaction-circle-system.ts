import 'phaser';
import { InteractionTracker } from '../lib/interaction-tracker';
import { SpriteComponent } from '../components/sprite-component';

export class HasInteracionCircleSystem implements SystemsManager.System {
  static SystemTags = {
    hasInteractionCircle: 'hasInteractionCircle',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.HasInteractionCircle.Entity, data: SystemsManager.EntityRegistrationData, tag: string): void {
    const interactionCircle = new Phaser.Geom.Circle(data.x, data.y, data.interactionRadius);
    entity.interactionControl = data.interactionControl;

    if (data.interactionDebug) {
      const debugCircle = this.scene.add.circle(data.x, data.y, data.interactionRadius, 0x00FF00, 0.5);
      debugCircle.setOrigin(0.25, 0.25);

      entity.debugInteractionCircle = debugCircle;
    }

    entity.interactionTracker = new InteractionTracker();
    entity.interactionCircle = interactionCircle;
  }

  update(tagManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasInteractionCircle.Entity[] = tagManager.getEntities(HasInteracionCircleSystem.SystemTags.hasInteractionCircle);

    for (let entity of entities) {
      entity.interactionCircle.setPosition(entity.components[SpriteComponent.tag].sprite.x, entity.components[SpriteComponent.tag].sprite.y);

      if (entity.debugInteractionCircle) {
        const position = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main) as { x: number, y: number };
        entity.debugInteractionCircle.setPosition(entity.components[SpriteComponent.tag].sprite.x, entity.components[SpriteComponent.tag].sprite.y);

        if (entity.debugInteractionCircle) {
          if (Phaser.Geom.Intersects.CircleToCircle(entity.interactionCircle, new Phaser.Geom.Circle(position.x, position.y, 1))) {
            entity.debugInteractionCircle.setFillStyle(0xFF0000, 0.5);
          } else {
            entity.debugInteractionCircle.setFillStyle(0x00FF00, 0.5);
          }
        }
      }
    };

    /*
      * entering -> active -> exiting
    */
    for (let entity of entities) {
      const intersectingEntityIds = this.getIntersectingInteractionIds(entity, entities);

      entity.interactionTracker.update(intersectingEntityIds);
    };
  }

  destroy(entity: Systems.HasInteractionCircle.Entity) {
    if (entity.debugInteractionCircle) {
      entity.debugInteractionCircle.destroy();
    }

    entity.interactionTracker.destroy();
    delete entity.interactionTracker;

    delete entity.debugInteractionCircle;
  }

  private getIntersectingInteractionIds(entity: Systems.HasInteractionCircle.Entity, allEntities: Systems.HasInteractionCircle.Entity[]): string[] {
    return allEntities
      .filter(otherEntity => otherEntity.id !== entity.id)
      .filter(otherEntity => {
        const circle1 = entity.interactionCircle;
        const circle2 = otherEntity.interactionCircle;

        return Phaser.Geom.Intersects.CircleToCircle(circle1, circle2);
      })
      .map(otherEntity => otherEntity.id);
  }
}
