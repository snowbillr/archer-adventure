export class SpriteComponent implements Phecs.Component {
  public static tag: string = 'sprite';

  public sprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    const { x, y, texture, frame } = data;
    this.sprite = scene.add.sprite(x, y, texture, frame);

    this.sprite.y -= this.sprite.height * this.sprite.originY;

    if (data.scale) {
      this.sprite.setScale(data.scale);
    }

    if (data.depth) {
      this.sprite.setDepth(data.depth);
    }
  }

  destroy() {
    this.sprite.destroy();

    delete this.sprite;
  }
}
