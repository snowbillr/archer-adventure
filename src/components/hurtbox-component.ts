import { AttachmentComponent } from './attachment-component';

export class HurtboxComponent implements Phecs.Component {
  public static tag: string = 'hurtbox';

  public hurtboxFrames: Systems.HasHurtboxes.Frame[];

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.hurtboxFrames = scene.cache.json.get(data.hurtboxesKey).frames;

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

  destroy() {
    delete this.hurtboxFrames;
  }
}
