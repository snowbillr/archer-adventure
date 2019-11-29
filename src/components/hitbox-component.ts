import { AttachmentComponent } from './attachment-component';

export class HitboxComponent implements Phecs.Component {
  public static tag: string = 'hitbox';

  public hitboxFrames: Systems.HasHitboxes.Frame[]

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.hitboxFrames = scene.cache.json.get(data.hitboxesKey).frames;

    const maxAttachmentCount = this.hitboxFrames
      .map(frame => frame.hitboxes.length)
      .reduce((localMaxAttachmentCount, attachmentCount) => Math.max(localMaxAttachmentCount, attachmentCount), 0);

    for (let i = 0; i < maxAttachmentCount; i++) {
      entity.components[AttachmentComponent.tag].createAttachment('hitbox', {
        offsetX: 0,
        offsetY: 0,
        width: 0,
        height: 0,
      });
    }
  }

  destroy() {
    delete this.hitboxFrames;
  }
}
