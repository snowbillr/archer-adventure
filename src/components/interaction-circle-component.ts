import { InteractionTracker } from '../lib/interaction-tracker';
import { Attachment } from '../lib/attachments/attachment';
import { AttachmentComponent } from './attachment-component';

export class InteractionCircleComponent implements Phecs.Component {
  // public interactionCircle: Phaser.Geom.Circle;
  public interactionTracker: InteractionTracker;
  public debugInteractionCircle?: Phaser.GameObjects.Arc;

  private attachment: Attachment;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.attachment = entity.getComponent(AttachmentComponent).createAttachment('interaction', {
      shape: 'circle',
      offsetX: 0,
      offsetY: 0,
      radius: data.interactionRadius,
    });

    /*
    const interactionCircle = new Phaser.Geom.Circle(data.x, data.y, data.interactionRadius);

    if (data.interactionDebug) {
      const debugCircle = scene.add.circle(data.x, data.y, data.interactionRadius, 0x00FF00, 0.5);
      debugCircle.setOrigin(0.5, 0.5);

      this.debugInteractionCircle = debugCircle;
    }
    */

    this.interactionTracker = new InteractionTracker();
    // this.interactionCircle = interactionCircle;
  }

  destroy() {
    /*
    if (this.debugInteractionCircle) {
      this.debugInteractionCircle.destroy();
    }
    */

    this.interactionTracker.destroy();
    this.attachment.destroy();

    // delete this.interactionCircle;
    delete this.interactionTracker;
    delete this.debugInteractionCircle;
  }
}
