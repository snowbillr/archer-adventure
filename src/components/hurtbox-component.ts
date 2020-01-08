import { AttachmentComponent } from './attachment-component';
import { Attachment } from '../lib/attachments/attachment';

const HURTBOX_DEBUG_COLOR = 0x0000FF;

export class HurtboxComponent implements Phecs.Component {
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
      entity.getComponent(AttachmentComponent).createAttachment('hurtbox', {
        shape: 'rectangle',
        offsetX: 0,
        offsetY: 0,
        width: 0,
        height: 0,
      }, data.debug ? HURTBOX_DEBUG_COLOR : undefined);
    }
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;

    this.entity.getComponent(AttachmentComponent)
      .getAttachmentsByType('hurtbox').forEach((hurtbox: Attachment) => {
        hurtbox.disable();
    });
  }

  destroy() {
    delete this.hurtboxFrames;
  }
}
