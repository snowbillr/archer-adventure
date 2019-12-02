import { InteractionTracker } from '../lib/interaction-tracker';

export class InteractionCircleComponent implements Phecs.Component {
  public static tag: string = 'interaction-circle';

  public interactionControl: string;
  public interactionCircle: Phaser.Geom.Circle;
  public interactionTracker: InteractionTracker;
  public debugInteractionCircle?: Phaser.GameObjects.Arc;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.interactionControl = data.interactionControl;

    const interactionCircle = new Phaser.Geom.Circle(data.x, data.y, data.interactionRadius);

    if (data.interactionDebug) {
      const debugCircle = scene.add.circle(data.x, data.y, data.interactionRadius, 0x00FF00, 0.5);
      debugCircle.setOrigin(0.5, 0.5);

      this.debugInteractionCircle = debugCircle;
    }

    this.interactionTracker = new InteractionTracker();
    this.interactionCircle = interactionCircle;
  }

  destroy() {
    if (this.debugInteractionCircle) {
      this.debugInteractionCircle.destroy();
    }

    this.interactionTracker.destroy();

    delete this.interactionControl;
    delete this.interactionCircle;
    delete this.interactionTracker;
    delete this.debugInteractionCircle;
  }
}
