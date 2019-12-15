type IndicatorTarget = Phaser.GameObjects.Sprite | Phaser.GameObjects.BitmapText;

export enum IndicatorSide {
  TOP = 'top',
  LEFT = 'left',
};

const INDICATOR_OFFSET = 10;

const INDICATOR_SPRITES = {
  [IndicatorSide.TOP]: 'indicator-down',
  [IndicatorSide.LEFT]: 'indicator-right',
};

const INDICATOR_ANIMATIONS = {
  [IndicatorSide.TOP]: 'indicator-down',
  [IndicatorSide.LEFT]: 'indicator-right',
};

export class Indicator {
  private sprite: Phaser.GameObjects.Sprite;
  private side: IndicatorSide;

  constructor(scene: Phaser.Scene, target: IndicatorTarget, side: IndicatorSide) {
    let x = target.x;
    let y = target.y;

    this.side = side;

    this.sprite = scene.add.sprite(x, y, INDICATOR_SPRITES[side]);
    this.sprite.setDepth(target.depth);

    if (side === IndicatorSide.TOP) {
      this.sprite.setOrigin(0.5, 1);
      this.sprite.y = y - ((target.height * target.scaleY) / 2) - INDICATOR_OFFSET;
    } else if (side === IndicatorSide.LEFT) {
      this.sprite.setOrigin(1, 0.5);
      this.sprite.x = x - ((target.width * target.scaleX) / 2) - INDICATOR_OFFSET;
    }
  }

  show() {
    this.sprite.visible = true;
    this.sprite.active = true;
    this.sprite.anims.play(INDICATOR_ANIMATIONS[this.side]);
  }

  hide() {
    this.sprite.visible = false;
    this.sprite.active = false;
    this.sprite.anims.stop();
  }

  destroy() {
    this.sprite.destroy();
  }
}