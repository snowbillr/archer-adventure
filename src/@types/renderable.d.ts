declare namespace Renderable {
  interface Component {
    create(): void;
    getSprite(): Phaser.GameObjects.Sprite;
  }
}

declare interface IsRenderable {
  sprite: Phaser.GameObjects.Sprite;
}
