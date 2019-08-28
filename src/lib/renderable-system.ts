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

  registerEntity(entity: Renderable.Entity, data: { [key: string]: any }): void {
    console.log('renderable')
    const { x, y, texture, frame } = data;
    const sprite = this.scene.add.sprite(x, y, texture, frame);

    if (data.scale) {
      sprite.setScale(data.scale);
    }

    entity.sprite = sprite;
  }
}
