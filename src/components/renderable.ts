import 'phaser';

type Frame = string | number;

export class Renderable implements Renderable.Component {
  private scene: Phaser.Scene;

  private x: number;
  private y: number;
  private key: string;
  private frame: Frame;
  private _sprite!: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, frame?: Frame) {
    this.scene = scene;

    this.x = x;
    this.y = y;
    this.key = key;
    this.frame = frame || 0;
  }

  create() {
    this._sprite = this.scene.add.sprite(this.x, this.y, this.key, this.frame);
  }

  getSprite() {
    return this._sprite;
  }
}
