import { InteractionTracker } from '../lib/interaction-tracker';
import { Attachment } from '../lib/attachments/attachment';
import { AttachmentComponent } from './attachment-component';

export class InteractionComponent implements Phecs.Component {
  public interactionTracker: InteractionTracker;
  public debugInteractionCircle?: Phaser.GameObjects.Arc;

  private attachment: Attachment;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.attachment = entity.getComponent(AttachmentComponent).createAttachment('interaction', {
      offsetX: 0,
      offsetY: 0,
      shape: 'circle',
      radius: data.interactionRadius,
    });

    this.interactionTracker = new InteractionTracker();
  }

  destroy() {
    this.interactionTracker.destroy();
    this.attachment.destroy();

    delete this.interactionTracker;
    delete this.debugInteractionCircle;
  }
}
