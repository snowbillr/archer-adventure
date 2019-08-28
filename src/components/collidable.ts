export class Collidable<T extends Systems.HasSprite> implements Collidable.Component {
  private scene: Phaser.Scene;
  private entity: T;
  private animationsKey: string;
  private hitboxFrames!: Collidable.HitboxFrame[];

  private rectanglePool: Phaser.Geom.Rectangle[];
  private activeRectangles: Phaser.Geom.Rectangle[];

  private debugRectangles: Phaser.GameObjects.Rectangle[];
  private debug: boolean;
  private debugPointerPosition: any;
  private debugColor: number;

  constructor(scene: Phaser.Scene, entity: T, animationsKey: string, debug: boolean = false) {
    this.scene = scene;
    this.entity = entity;
    this.animationsKey = animationsKey;

    this.rectanglePool = [];
    this.activeRectangles = [];

    this.debug = debug;
    this.debugColor = 0x00FF00;
    this.debugRectangles = [];
  }

  create() {
    this.hitboxFrames = this.scene.cache.json.get(this.animationsKey).frames;

    this.debugRectangles = []
    this.debugPointerPosition = { x: 0, y: 0 };

    if (this.debug) {
      this.scene.input.on('pointermove', (e: any) => {
        this.debugPointerPosition = e.position;
      });
    }
  }

  update() {
    this.disableHitboxes();

    const key = this.entity.sprite!.frame.texture.key;
    const frame = this.entity.sprite!.frame.name;

    const hitboxFrame: Collidable.HitboxFrame = this.hitboxFrames.find((h: Collidable.HitboxFrame) => h.key === key && h.frame === frame) as Collidable.HitboxFrame;
    if (hitboxFrame && hitboxFrame.hitboxes) {
      hitboxFrame.hitboxes.forEach((hitbox: Collidable.HitboxConfig) => {
        if (hitbox.type === 'rectangle') {
          this.setRectangleHitbox(hitbox);
        } else {
          throw 'unsupported hitbox type';
        }
      })
    }

    if (this.debug) {
      this.renderDebugHitboxes();
    }
  }

  private renderDebugHitboxes() {
    const point = new Phaser.Geom.Point(this.debugPointerPosition.x, this.debugPointerPosition.y);

    this.activeRectangles.forEach((activeRectangle, i) => {
      if (Phaser.Geom.Rectangle.ContainsPoint(activeRectangle, point)) {
        this.debugColor = 0xFF0000;
      } else {
        this.debugColor = 0x00FF00;
      }

      const debugRectangle = this.debugRectangles[i];

      debugRectangle.visible = true;
      debugRectangle.fillColor = this.debugColor;

      debugRectangle.setOrigin(0, 0);
      debugRectangle.x = activeRectangle.x;
      debugRectangle.y = activeRectangle.y;
      debugRectangle.width = activeRectangle.width;
      debugRectangle.height = activeRectangle.height;
    })
  }

  private disableHitboxes() {
    this.rectanglePool = [...this.rectanglePool, ...this.activeRectangles];
    this.activeRectangles = [];

    this.debugRectangles.forEach(r => r.visible = false);
  }

  private getAvailableRectangle() {
    let rectangle = this.rectanglePool.pop();
    if (rectangle == null) {
      rectangle = new Phaser.Geom.Rectangle(0, 0, 0, 0);
      if (this.debug) {
        this.debugRectangles.push(this.scene.add.rectangle(0, 0, 0, 0, this.debugColor, 0.5));
      }
    }

    this.activeRectangles.push(rectangle);
    return rectangle;
  }

  private setRectangleHitbox(hitbox: Collidable.HitboxConfig) {
    const rectangle = this.getAvailableRectangle();

    const scaleX = this.entity.sprite!.scaleX;
    const scaleY = this.entity.sprite!.scaleY;

    const offsetX = this.entity.sprite!.flipX ? hitbox.x * -1 : hitbox.x;
    const offsetY = this.entity.sprite!.flipY ? hitbox.y * -1 : hitbox.y;

    const width = scaleX * hitbox.width;
    const height = scaleY * hitbox.height;
    const x = (this.entity.sprite!.x + (offsetX * scaleX)) - (width * this.entity.sprite!.originX);
    const y = (this.entity.sprite!.y + (offsetY * scaleY)) - (height * this.entity.sprite!.originY);

    rectangle.x = x;
    rectangle.y = y;
    rectangle.width = width;
    rectangle.height = height;
  }
}
