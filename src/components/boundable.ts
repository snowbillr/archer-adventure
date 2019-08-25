export class Boundable<T extends PhysicallyRenderable.Entity> {
  private scene: Phaser.Scene;
  private boundsKey: string;
  private entity: T;

  private boundsFrames!: Boundable.BoundableFrame[];

  constructor(scene: Phaser.Scene, entity: T, boundsKey: string) {
    this.scene = scene;
    this.entity = entity;
    this.boundsKey = boundsKey;
  }

  create() {
    this.boundsFrames = this.scene.cache.json.get(this.boundsKey);
  }

  update() {
    const key = this.entity.sprite.frame.texture.key;
    const frame = this.entity.sprite.frame.name;

    const boundsFrame: Boundable.BoundableFrame = this.boundsFrames.find((b: Boundable.BoundableFrame) => b.key === key && b.frame === frame) as Boundable.BoundableFrame;
    if (boundsFrame) {
      const bounds: Boundable.BoundableBounds = boundsFrame.bounds;
      this.entity.body.setSize(bounds.size.width, bounds.size.height);
      this.entity.body.setOffset(bounds.offset.x, bounds.offset.y);
    } else {
      this.entity.body.setSize(this.entity.sprite.width, this.entity.sprite.height);
      this.entity.body.setOffset(0, 0);
    }

    this.entity.body.updateBounds();
  }
}
