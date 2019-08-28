export class Interactable<T extends (PhysicallyRenderable.Entity | Renderable.Entity)> {
  private scene: Phaser.Scene;
  private entity: T;

  private x: number;
  private y: number;
  private radius: number;

  private interactionCircle!: Phaser.Geom.Circle;

  private debug: boolean;
  private debugCircle!: Phaser.GameObjects.Shape;

  constructor(scene: Phaser.Scene, entity: T, radius: number, debug?: boolean) {
    this.scene = scene;
    this.entity = entity;

    this.radius = radius;

    this.debug = debug || false;
  }

  create() {
    this.interactionCircle = new Phaser.Geom.Circle(this.entity.sprite.x, this.entity.sprite.y, this.radius);

    if (this.debug) {
      this.debugCircle = this.scene.add.circle(this.entity.sprite.x, this.entity.sprite.y, this.radius, 0x00FF00, 0.5);
      this.debugCircle.setOrigin(0.25, 0.25);
      console.log(this.debugCircle);
    }
  }

  update() {
    this.interactionCircle.setPosition(this.entity.sprite.x, this.entity.sprite.y);

    if (this.debug) {
      const position = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
      this.debugCircle.setPosition(this.entity.sprite.x, this.entity.sprite.y);

      if (Phaser.Geom.Intersects.CircleToCircle(this.interactionCircle, new Phaser.Geom.Circle(position.x, position.y, 1))) {
        this.debugCircle.setFillStyle(0xFF0000, 0.5);
      } else {
        this.debugCircle.setFillStyle(0x00FF00, 0.5);
      }
    }
  }

  getInteractionCircle(): Phaser.Geom.Circle {
    return this.interactionCircle;
  }
}
