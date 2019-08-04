export class Hitboxes<T extends (PhysicallyRenderable.Entity | Renderable.Entity)> {
  private scene: Phaser.Scene;
  private entity: T;
  private animationsKey: string;
  private hitboxFrames!: [];

  private rectangle!: Phaser.Geom.Rectangle;

  private debugRectangle!: Phaser.GameObjects.Rectangle;
  private debug: boolean;
  private debugPointerPosition: any;
  private debugColor: number;

  constructor(scene: Phaser.Scene, entity: T, animationsKey: string, debug: boolean = false) {
    this.scene = scene;
    this.entity = entity;
    this.animationsKey = animationsKey;
    this.debug = debug;
    this.debugColor = 0x00FF00;
  }

  create() {
    this.hitboxFrames = this.scene.cache.json.get(this.animationsKey).frames;
    this.rectangle = new Phaser.Geom.Rectangle(0, 0, 0, 0);

    this.debugRectangle = this.scene.add.rectangle(0, 0, 0, 0, this.debugColor, 0.5);
    this.debugPointerPosition = { x: 0, y: 0 };
    this.scene.input.on('pointermove', (e: any) => {
      this.debugPointerPosition = e.position;
    });
  }

  update() {
    const key = this.entity.sprite.frame.texture.key;
    const frame = this.entity.sprite.frame.name;

    const hitboxDefinition: any = this.hitboxFrames.find((a: Phaser.Types.Animations.JSONAnimationFrame) => a.key === key && a.frame === frame);
    if (hitboxDefinition && hitboxDefinition.hitboxes) {
      const h = hitboxDefinition.hitboxes[0];

      const scaleX = this.entity.sprite.scaleX;
      const scaleY = this.entity.sprite.scaleY;

      const width = scaleX * h.width;
      const height = scaleY * h.height;
      const x = (this.entity.sprite.x + (h.x * scaleX)) - (width * this.entity.sprite.originX);
      const y = (this.entity.sprite.y + (h.y * scaleY)) - (height * this.entity.sprite.originY);

      this.rectangle.x = x;
      this.rectangle.y = y;
      this.rectangle.width = width;
      this.rectangle.height = height;
    }

    if (this.debug && hitboxDefinition && hitboxDefinition.hitboxes) {
      const point = new Phaser.Geom.Point(this.debugPointerPosition.x, this.debugPointerPosition.y);
      if (Phaser.Geom.Rectangle.ContainsPoint(this.rectangle, point)) {
        this.debugColor = 0xFF0000;
      } else {
        this.debugColor = 0x00FF00;
      }

      this.debugRectangle.visible = true;

      this.debugRectangle.fillColor = this.debugColor;

      this.debugRectangle.setOrigin(0, 0);
      this.debugRectangle.x = this.rectangle.x;
      this.debugRectangle.y = this.rectangle.y;
      this.debugRectangle.width = this.rectangle.width;
      this.debugRectangle.height = this.rectangle.height;
    } else {
      this.debugRectangle.visible = false;
    }
  }
}
