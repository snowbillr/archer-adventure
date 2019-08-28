import 'phaser';

import { BaseSystem } from './base-system';

export class RenderableSystem extends BaseSystem<Tags.Entity, Tags.Entity> implements Tags.TagSystem {
  static SystemTags = {
    renderable: 'renderable',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(RenderableSystem.SystemTags.renderable, '');

    this.scene = scene;
  }

  registerEntity(entity: Tags.Entity, data: { [key: string]: any }): void {
    const { x, y, texture, frame } = data;
    const sprite = this.scene.add.sprite(x, y, texture, frame);

    // entity.sprite = sprite;
  }
}
