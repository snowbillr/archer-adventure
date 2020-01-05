import { RectangleShape } from "./rectangle-shape";

export class Attachment {
  public type: string;
  public shape: RectangleShape;

  private config: Attachments.Config;
  private enabled: boolean;

  constructor(type: string, config: Attachments.Config, debug: boolean = false, scene: Phaser.Scene) {
    this.type = type;
    this.config = config;
    this.enabled = true;

    this.shape = new RectangleShape(this.config, debug, scene);
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
    return this.shape.overlapsRectangle(attachment.shape.shape);
  }

  setConfig(config: Attachments.Config) {
    this.shape.setConfig(config);
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
