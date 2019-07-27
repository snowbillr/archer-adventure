declare namespace PhysicallyRenderable {
  interface Component {
    create: () => void;
    getSprite: () => Phaser.Physics.Arcade.Sprite;
  }

  interface IsPhysicallyRenderable {
    sprite: Phaser.GameObjects.Sprite;
  }
}
