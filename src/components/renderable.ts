import 'phaser';

export class Renderable implements Renderable.Component {
  private scene: Phaser.Scene;

  private x: number;
  private y: number;
  private key: string;
  private _sprite!: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    this.scene = scene;

    this.x = x;
    this.y = y;
    this.key = key;
  }

  create() {
    this._sprite = this.scene.add.sprite(this.x, this.y, this.key);
  }

  getSprite() {
    return this._sprite;
  }
}
