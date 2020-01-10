import { DepthManager } from "../depth-manager";

// Origin to sprite is top-left.

export class RectangleShape {
  private config: Attachments.RectangleConfig;

  public shape: Phaser.Geom.Rectangle;

  private debugGraphic?: Phaser.GameObjects.Rectangle;

  constructor(config: Attachments.RectangleConfig, debugColor?: number, scene?: Phaser.Scene) {
    this.config = config;

    this.shape = new Phaser.Geom.Rectangle(0, 0, config.width, config.height);

    if (debugColor && scene) {
      this.debugGraphic = scene.add.rectangle(this.shape.x, this.shape.y, this.shape.width, this.shape.height, debugColor, 0.5);
      this.debugGraphic.setOrigin(0); // see sync method coords centering
      this.debugGraphic.setDepth(DepthManager.depthFor('debug'));
    }
  }

  setConfig(config: Attachments.RectangleConfig) {
    this.config = config;
  }

  disable() {
    this.shape.x = 0;
    this.shape.y = 0;
    this.shape.width = 0;
    this.shape.height = 0;

    if (this.debugGraphic) {
      this.debugGraphic.width = 0;
      this.debugGraphic.height = 0;
    }
  }

  overlapsRectangle(rectangle: Phaser.Geom.Rectangle) {
    return Phaser.Geom.Intersects.RectangleToRectangle(rectangle, this.shape);
  }

  overlapsCircle(circle: Phaser.Geom.Circle) {
    return Phaser.Geom.Intersects.CircleToRectangle(circle, this.shape);
  }

  syncToSprite(sprite: Phaser.GameObjects.Sprite) {
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

    if (this.debugGraphic) {
      /*
      const mousepoint = this.debugRect.scene.input.activePointer
      const worldpoint = this.debugRect.scene.cameras.main.getWorldPoint(mousepoint.x, mousepoint.y)
      if (this.shape.contains(worldpoint.x, worldpoint.y)) {
        this.debugRect.fillColor = 0xFF0000;
      } else {
        this.debugRect.fillColor = 0x0000FF;
      }
      */

      this.debugGraphic.x = this.shape.x;
      this.debugGraphic.y = this.shape.y;
      this.debugGraphic.width = this.shape.width;
      this.debugGraphic.height = this.shape.height;
    }
  }

  destroy() {
    if (this.debugGraphic) {
      this.debugGraphic.destroy();
    }

    delete this.shape;
    delete this.destroy;
  }
}