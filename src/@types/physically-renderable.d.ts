declare namespace PhysicallyRenderable {
  interface Component {
    create: () => void;
    getSprite: () => Phaser.Physics.Arcade.Sprite;
  }

  interface Entity {
    sprite: Phaser.GameObjects.Sprite;
  }
}
