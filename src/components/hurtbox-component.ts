import { AttachmentComponent } from './attachment-component';
import { Attachment } from '../lib/attachment';

export class HurtboxComponent implements Phecs.Component {
  public static tag: string = 'hurtbox';

  public hurtboxFrames: Systems.HasHurtboxes.Frame[];
  public enabled: boolean;

  private entity: Phecs.Entity;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.entity = entity;
    this.hurtboxFrames = scene.cache.json.get(data.hurtboxesKey).frames;
    this.enabled = true;

    const maxAttachmentCount = this.hurtboxFrames
      .map(frame => frame.hurtboxes.length)
      .reduce((localMaxAttachmentCount, attachmentCount) => Math.max(localMaxAttachmentCount, attachmentCount), 0);

    for (let i = 0; i < maxAttachmentCount; i++) {
      entity.components[AttachmentComponent.tag].createAttachment('hurtbox', {
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

    this.entity.components[AttachmentComponent.tag]
      .getAttachmentsByType('hurtbox').forEach((hurtbox: Attachment) => {
        hurtbox.disable();
    });
  }

  destroy() {
    delete this.hurtboxFrames;
  }
}
