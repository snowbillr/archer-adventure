declare namespace Renderable {
  interface Component {
    create(): void;
    getSprite(): Phaser.GameObjects.Sprite;
  }

  interface Entity {
    sprite: Phaser.GameObjects.Sprite;
  }
}

