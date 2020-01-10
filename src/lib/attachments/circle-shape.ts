import { DepthManager } from "../depth-manager";

// Origin to sprite is centered.

export class CircleShape {
  private config: Attachments.CircleConfig;

  public shape: Phaser.Geom.Circle;

  private debugGraphic?: Phaser.GameObjects.Arc;

  constructor(config: Attachments.CircleConfig, debugColor?: number, scene?: Phaser.Scene) {
    this.config = config;

    this.shape = new Phaser.Geom.Circle(0, 0, config.radius);

    if (debugColor && scene) {
      this.debugGraphic = scene.add.circle(this.shape.x, this.shape.y, this.shape.radius, debugColor, 0.5);
      this.debugGraphic.setOrigin(0.5);
      this.debugGraphic.setDepth(DepthManager.depthFor('debug'));
    }
  }

  setConfig(config: Attachments.CircleConfig) {
    this.config = config;
  }

  disable() {
    this.shape.x = 0;
    this.shape.y = 0;
    this.shape.radius = 0;

    if (this.debugGraphic) {
      this.debugGraphic.radius = 0;
    }
  }

  overlapsRectangle(rectangle: Phaser.Geom.Rectangle) {
    return Phaser.Geom.Intersects.CircleToRectangle(this.shape, rectangle);
  }

  overlapsCircle(circle: Phaser.Geom.Circle) {
    return Phaser.Geom.Intersects.CircleToCircle(this.shape, circle);
  }

  syncToSprite(sprite: Phaser.GameObjects.Sprite) {
    const scale = sprite.scale;

    const offsetX = (sprite.flipX ? this.config.offsetX * -1 : this.config.offsetX) * scale;
    const offsetY = (sprite.flipY ? this.config.offsetY * -1 : this.config.offsetY) * scale;

    const radius = scale * this.config.radius;

    // This `getCenter` call only works if it is called against the scene's POST_UPDATE event.
    // Arcade Physics only syncs up the sprite and the body in POST_UPDATE. Before then,
    // the changes made from the physics system aren't propagated to the sprite.
    const spriteCenter = sprite.getCenter();
    const coords = new Phaser.Geom.Point(spriteCenter.x + offsetX, spriteCenter.y + offsetY);
    Phaser.Math.RotateAround(coords, spriteCenter.x, spriteCenter.y, sprite.rotation);

    this.shape.x = coords.x;
    this.shape.y = coords.y;
    this.shape.radius = radius;

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
      this.debugGraphic.radius = this.shape.radius;
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