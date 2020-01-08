import { RectangleShape } from "./rectangle-shape";
import { CircleShape } from "./circle-shape";

export class Attachment {
  public type: string;
  public shape: Attachments.Shape;

  private enabled: boolean;

  constructor(type: string, config: Attachments.ShapeConfig, debugColor?: number, scene?: Phaser.Scene) {
    this.type = type;
    this.enabled = true;

    if (config.shape === 'circle') {
      this.shape = new CircleShape(config as Attachments.CircleConfig, debugColor, scene);
    } else if (config.shape === 'rectangle') {
      this.shape = new RectangleShape(config as Attachments.RectangleConfig, debugColor, scene);
    } else {
      throw new Error('Attachment::INVALID_SHAPE_TYPE_IN_CONFIG');
    }
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;

    this.shape.disable();
  }

  isEnabled() {
    return this.enabled;
  }

  overlaps(attachment: Attachment) {
    if (this.shape instanceof RectangleShape) {
      if (attachment.shape instanceof RectangleShape) {
        return this.shape.overlapsRectangle(attachment.shape.shape);
      } else if (attachment.shape instanceof CircleShape) {
        return this.shape.overlapsCircle(attachment.shape.shape);
      }
    } else if (this.shape instanceof CircleShape) {
      if (attachment.shape instanceof RectangleShape) {
        return this.shape.overlapsRectangle(attachment.shape.shape);
      } else if (attachment.shape instanceof CircleShape) {
        return this.shape.overlapsCircle(attachment.shape.shape);
      }
    }

    throw new Error('Attachment::INVALID_ATTACHMENT_FOR_OVERLAP');
  }

  setConfig(config: Attachments.ShapeConfig) {
    if (this.shape instanceof RectangleShape) {
      this.shape.setConfig(config as Attachments.RectangleConfig);
    }
  }

  syncToSprite(sprite: Phaser.GameObjects.Sprite) {
    if (this.enabled) {
     this.shape.syncToSprite(sprite);
    }
  }

  destroy() {
    this.shape.destroy();
  }
}
