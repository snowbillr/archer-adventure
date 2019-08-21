export class Collidable<T extends (PhysicallyRenderable.Entity | Renderable.Entity)> implements Collidable.Component {
  private scene: Phaser.Scene;
  private entity: T;
  private animationsKey: string;
  private hitboxFrames!: Collidable.HitboxFrame[];

  private arcadeSpritePool: Phaser.Physics.Arcade.Sprite[];
  private activeArcadeSprites: Phaser.Physics.Arcade.Sprite[];

  private debugRectangles: Phaser.GameObjects.Rectangle[];
  private debug: boolean;
  private debugPointerPosition: any;
  private debugColor: number;

  constructor(scene: Phaser.Scene, entity: T, animationsKey: string, debug: boolean = false) {
    this.scene = scene;
    this.entity = entity;
    this.animationsKey = animationsKey;

    this.arcadeSpritePool = [];
    this.activeArcadeSprites = [];

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

    const key = this.entity.sprite.frame.texture.key;
    const frame = this.entity.sprite.frame.name;

    const hitboxFrame: Collidable.HitboxFrame = this.hitboxFrames.find((h: Collidable.HitboxFrame) => h.key === key && h.frame === frame) as Collidable.HitboxFrame;
    if (hitboxFrame && hitboxFrame.hitboxes) {
      hitboxFrame.hitboxes.forEach((hitbox: Collidable.HitboxConfig) => {
        if (hitbox.type === 'rectangle') {
          this.setArcadeSpriteHitbox(hitbox);
        } else {
          throw 'unsupported hitbox type';
        }
      })
    }
  }

  collide(arcadeObject: Phaser.Types.Physics.Arcade.ArcadeColliderType) {
    return this.scene.physics.world.collide(arcadeObject, this.activeArcadeSprites);
  }

  private disableHitboxes() {
    this.arcadeSpritePool = [...this.arcadeSpritePool, ...this.activeArcadeSprites];
    this.activeArcadeSprites = [];

    this.arcadeSpritePool.forEach(as => {
      as.disableBody(true, true);
    });

    this.debugRectangles.forEach(r => r.visible = false);
  }

  private getAvailableArcadeSprite() {
    let arcadeSprite = this.arcadeSpritePool.pop();
    if (arcadeSprite == null) {
      arcadeSprite = this.scene.physics.add.sprite(0, 0, '');
      if (this.debug) {
        this.debugRectangles.push(this.scene.add.rectangle(0, 0, 0, 0, this.debugColor, 0.5));
      }
    }

    this.activeArcadeSprites.push(arcadeSprite);
    return arcadeSprite;
  }

  private setArcadeSpriteHitbox(hitbox: Collidable.HitboxConfig) {
    const arcadeSprite = this.getAvailableArcadeSprite();
    arcadeSprite.setOrigin(0, 0);
    arcadeSprite.setVisible(false);
    arcadeSprite.enableBody(true, 0, 0, true, false);

    const scaleX = this.entity.sprite.scaleX;
    const scaleY = this.entity.sprite.scaleY;

    const offsetX = this.entity.sprite.flipX ? hitbox.x * -1 : hitbox.x;
    const offsetY = this.entity.sprite.flipY ? hitbox.y * -1 : hitbox.y;

    const width = scaleX * hitbox.width;
    const height = scaleY * hitbox.height;
    const x = (this.entity.sprite.x + (offsetX * scaleX)) - (width * this.entity.sprite.originX);
    const y = (this.entity.sprite.y + (offsetY * scaleY)) - (height * this.entity.sprite.originY);

    arcadeSprite.setOrigin(0, 0);
    arcadeSprite.setSize(width, height);
    arcadeSprite.setDisplaySize(width, height);
    arcadeSprite.setPosition(x, y);

    if (this.debug) {
      arcadeSprite.setVisible(true);
    }
  }
}
