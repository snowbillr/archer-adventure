export class Attachment {
  public type: string;
  public shape: Phaser.Geom.Rectangle;

  private config: Attachment.Config;
  private enabled: boolean;

  private debugRect?: Phaser.GameObjects.Rectangle;

  constructor(type: string, config: Attachment.Config, debug: boolean = false, scene: Phaser.Scene) {
    this.type = type;
    this.config = config;
    this.enabled = true;
    this.shape = new Phaser.Geom.Rectangle(0, 0, config.width, config.height);

    if (debug && scene) {
      this.debugRect = scene.add.rectangle(this.shape.x, this.shape.y, this.shape.width, this.shape.height, 0x0000FF, 0.5);
      this.debugRect.fillColor = 0x0000FF;
      this.debugRect.setDepth(5);
    }
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;

    this.shape.x = 0;
    this.shape.y = 0;
    this.shape.width = 0;
    this.shape.height = 0;

    if (this.debugRect) {
      this.debugRect.x = this.shape.x;
      this.debugRect.y = this.shape.y;
      this.debugRect.width = this.shape.width;
      this.debugRect.height = this.shape.height;
    }
  }

  isEnabled() {
    return this.enabled === true;
  }

  overlaps(attachment: Attachment) {
    return Phaser.Geom.Rectangle.Overlaps(this.shape, attachment.shape);
  }

  setConfig(config: Attachment.Config) {
    this.config = config;
  }

  syncToSprite(sprite: Phaser.GameObjects.Sprite) {
    if (this.enabled) {
      const scaleX = sprite.scaleX;
      const scaleY = sprite.scaleY;

      const offsetX = (sprite.flipX ? this.config.offsetX * -1 : this.config.offsetX) * scaleX;
      const offsetY = (sprite.flipY ? this.config.offsetY * -1 : this.config.offsetY) * scaleY;

      const width = scaleX * this.config.width;
      const height = scaleY * this.config.height;

      // This `getCenter` call only works if it is called against the scene's POST_UPDATE event.
      // Arcade Physics only syncs up the sprite and the body in POST_UPDATE. Before then,
      // the changes made from the physics system aren't propagated to the sprite.
      const spriteCenter = sprite.getCenter();
      const coords = new Phaser.Geom.Point(spriteCenter.x + offsetX, spriteCenter.y + offsetY);
      Phaser.Math.RotateAround(coords, spriteCenter.x, spriteCenter.y, sprite.rotation);

      // Center the hitbox on the offset values
      coords.x -= width / 2;
      coords.y -= height / 2;

      this.shape.x = coords.x;
      this.shape.y = coords.y;
      this.shape.width = width;
      this.shape.height = height;
    }

    if (this.debugRect) {
      /*
      const mousepoint = this.debugRect.scene.input.activePointer
      const worldpoint = this.debugRect.scene.cameras.main.getWorldPoint(mousepoint.x, mousepoint.y)
      if (this.shape.contains(worldpoint.x, worldpoint.y)) {
        this.debugRect.fillColor = 0xFF0000;
      } else {
        this.debugRect.fillColor = 0x0000FF;
      }
      */

      this.debugRect.x = this.shape.x;
      this.debugRect.y = this.shape.y;
      this.debugRect.width = this.shape.width;
      this.debugRect.height = this.shape.height;
    }
  }

  destroy() {
    if (this.debugRect) {
      this.debugRect.destroy();
    }
  }
}
