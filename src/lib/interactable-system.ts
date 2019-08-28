import 'phaser';

import { BaseSystem } from './base-system';

export class InteractableSystem<T extends Systems.Interactable & Systems.Renderable> extends BaseSystem<T> implements Tags.TagSystem {
  static SystemTags = {
    interactable: 'interactable',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(InteractableSystem.SystemTags.interactable, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: Tags.EntityRegistrationData): void {
    const interactionCircle = new Phaser.Geom.Circle(data.x, data.y, data.radius);

    if (data.debug) {
      const debugCircle = this.scene.add.circle(data.x, data.y, data.radius, 0x00FF00, 0.5);
      debugCircle.setOrigin(0.25, 0.25);

      entity.debugInteractionCircle = debugCircle;
    }

    entity.interactionCircle = interactionCircle;
  }

  update(tagManager: Tags.TagManager) {
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
