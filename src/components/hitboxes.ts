export class Hitboxes<T extends (PhysicallyRenderable.Entity | Renderable.Entity)> {
  private scene: Phaser.Scene;
  private entity: T;
  private animationsKey: string;
  private hitboxFrames!: [];

  private rectangle!: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, entity: T, animationsKey: string) {
    this.scene = scene;
    this.entity = entity;
    this.animationsKey = animationsKey;
  }

  create() {
    this.hitboxFrames = this.scene.cache.json.get(this.animationsKey).frames;
    this.rectangle = this.scene.add.rectangle(0, 0, 0, 0, 0x00FF00, 0.5);
  }

  update() {
    const key = this.entity.sprite.frame.texture.key;
    const frame = this.entity.sprite.frame.name;

    const hitboxDefinition: any = this.hitboxFrames.find((a: Phaser.Types.Animations.JSONAnimationFrame) => a.key === key && a.frame === frame);
    if (hitboxDefinition && hitboxDefinition.hitboxes) {
      const h = hitboxDefinition.hitboxes[0];
      this.rectangle.visible = true;
      this.rectangle.setOrigin(this.entity.sprite.originX, this.entity.sprite.originY);
      this.rectangle.setScale(this.entity.sprite.scaleX, this.entity.sprite.scaleY);
      this.rectangle.x = this.entity.sprite.x + h.x;
      this.rectangle.y = this.entity.sprite.y + h.y;
      this.rectangle.width = h.width;
      this.rectangle.height = h.height;
    } else {
      this.rectangle.visible = false;
    }
  }

  render() {

  }
}
