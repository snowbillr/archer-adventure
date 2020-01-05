import { AttachmentComponent } from './attachment-component';
import { Attachment } from '../lib/attachments/attachment';

export class HitboxComponent implements Phecs.Component {
  public hitboxFrames: Systems.HasHitboxes.Frame[]
  public enabled: boolean;

  private entity: Phecs.Entity;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.entity = entity;
    this.hitboxFrames = scene.cache.json.get(data.hitboxesKey).frames;
    this.enabled = true;

    const maxAttachmentCount = this.hitboxFrames
      .map(frame => frame.hitboxes.length)
      .reduce((localMaxAttachmentCount, attachmentCount) => Math.max(localMaxAttachmentCount, attachmentCount), 0);

    for (let i = 0; i < maxAttachmentCount; i++) {
      entity.getComponent(AttachmentComponent).createAttachment('hitbox', {
        offsetX: 0,
        offsetY: 0,
        width: 0,
        height: 0,
      });
    }
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;

    this.entity.getComponent(AttachmentComponent)
      .getAttachmentsByType('hitbox').forEach((hitbox: Attachment) => {
        hitbox.disable();
    });
  }

  destroy() {
    delete this.hitboxFrames;
  }
}
