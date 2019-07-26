declare namespace Renderable {
  interface Component {
    create(): void;
    getSprite(): Phaser.GameObjects.Sprite;
  }

  interface IsRenderable {
    sprite: Phaser.GameObjects.Sprite;
  }
}

