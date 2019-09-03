import 'phaser';

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

    entity.interactionCircle = interactionCircle;
    entity.activeInteractionIds = [];
  }

  update(tagManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasInteractionCircle.Entity[] = tagManager.getEntities(HasInteracionCircleSystem.SystemTags.hasInteractionCircle);

    entities.forEach(entity => {
      entity.interactionCircle.setPosition(entity.sprite.x, entity.sprite.y);

      if (entity.debugInteractionCircle) {
        const position = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main) as { x: number, y: number };
        entity.debugInteractionCircle.setPosition(entity.sprite.x, entity.sprite.y);

        if (entity.debugInteractionCircle) {
          if (Phaser.Geom.Intersects.CircleToCircle(entity.interactionCircle, new Phaser.Geom.Circle(position.x, position.y, 1))) {
            entity.debugInteractionCircle.setFillStyle(0xFF0000, 0.5);
          } else {
            entity.debugInteractionCircle.setFillStyle(0x00FF00, 0.5);
          }
        }
      }
    });

    entities.forEach(entity => {
      entity.activeInteractionIds = this.getActiveInteractionIds(entity, entities);
    })
  }

  destroy(entity: Systems.HasInteractionCircle.Entity) {
    entity.activeInteractionIds = [];

    if (entity.debugInteractionCircle) {
      entity.debugInteractionCircle.destroy();
    }

    delete entity.activeInteractionIds;
    delete entity.debugInteractionCircle;
  }

  private getActiveInteractionIds(entity: Systems.HasInteractionCircle.Entity, allEntities: Systems.HasInteractionCircle.Entity[]): string[] {
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
