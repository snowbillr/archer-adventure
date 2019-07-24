export class Adventurer {
  public sprite!: Phaser.GameObjects.Sprite

  create(scene: Phaser.Scene) {
    this.sprite = scene.add.sprite(200, 200, 'adventurer-core');
    this.sprite.setScale(2);
  }
}
