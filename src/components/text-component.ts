export class TextComponent implements Phecs.Component {
  public bitmapText: Phaser.GameObjects.BitmapText;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.bitmapText = scene.add.bitmapText(data.x, data.y, data.font, data.text);

    if (data.origin) {
      this.bitmapText.setOrigin(data.origin);
    }
  }

  destroy() {
    this.bitmapText.destroy();
  }
}
