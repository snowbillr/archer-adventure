import 'phaser';

import { BaseSystem } from './base-system';

export class InteractableSystem<T extends Systems.Interactable & Systems.Renderable> extends BaseSystem<T, Tags.Entity> implements Tags.TagSystem {
  static SystemTags = {
    interactable: 'interactable',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(InteractableSystem.SystemTags.interactable, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: Tags.EntityRegistrationData): void {
    console.log('regsitered')
    const interactionCircle = new Phaser.Geom.Circle(data.x, data.y, data.radius);

    entity.interactionCircle = interactionCircle;
  }

  update(tagManager: Tags.TagManager) {
    super.update(tagManager);

    const entities = this.tag1s;
    entities.forEach(entity => {
      entity.interactionCircle!.setPosition(entity.sprite!.x, entity.sprite!.y);
    });
  }
}
