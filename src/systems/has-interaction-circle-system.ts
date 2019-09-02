import 'phaser';

export class HasInteracionCircleSystem implements SystemsManager.System {
  static SystemTags = {
    hasInteractionCircle: 'hasInteractionCircle',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.HasInteractionCircle.Entity, data: SystemsManager.EntityRegistrationData): void {
    const interactionCircle = new Phaser.Geom.Circle(data.x, data.y, data.interactionRadius);

    if (data.interactionDebug) {
      const debugCircle = this.scene.add.circle(data.x, data.y, data.interactionRadius, 0x00FF00, 0.5);
      debugCircle.setOrigin(0.25, 0.25);

      entity.debugInteractionCircle = debugCircle;
    }

    entity.interactionCircle = interactionCircle;
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
  }
}
