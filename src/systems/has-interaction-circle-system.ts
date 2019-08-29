import 'phaser';

import { BaseSystem } from '../lib/base-system';

export class HasInteracionCircleSystem<T extends Systems.HasInteractionCircle.Entity & Systems.HasSprite.Entity> extends BaseSystem<T> implements Systems.System {
  static SystemTags = {
    hasInteractionCircle: 'hasInteractionCircle',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasInteracionCircleSystem.SystemTags.hasInteractionCircle, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: Systems.EntityRegistrationData): void {
    const interactionCircle = new Phaser.Geom.Circle(data.x, data.y, data.radius);

    if (data.debug) {
      const debugCircle = this.scene.add.circle(data.x, data.y, data.radius, 0x00FF00, 0.5);
      debugCircle.setOrigin(0.25, 0.25);

      entity.debugInteractionCircle = debugCircle;
    }

    entity.interactionCircle = interactionCircle;
  }

  update(tagManager: Systems.SystemsManager) {
    super.update(tagManager);

    const entities = this.tag1s;
    entities.forEach(entity => {
      entity.interactionCircle!.setPosition(entity.sprite!.x, entity.sprite!.y);

      if (entity.debugInteractionCircle) {
        const position = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main) as { x: number, y: number };
        entity.debugInteractionCircle.setPosition(entity.sprite!.x, entity.sprite!.y);

        if (Phaser.Geom.Intersects.CircleToCircle(entity.interactionCircle!, new Phaser.Geom.Circle(position.x, position.y, 1))) {
          entity.debugInteractionCircle.setFillStyle(0xFF0000, 0.5);
        } else {
          entity.debugInteractionCircle.setFillStyle(0x00FF00, 0.5);
        }
      }
    });
  }
}
