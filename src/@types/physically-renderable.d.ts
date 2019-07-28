declare namespace PhysicallyRenderable {
  interface Component {
    create: () => void;
    getSprite: () => Phaser.Physics.Arcade.Sprite;
    getBody: () => Phaser.Physics.Arcade.Body;
  }

  interface Entity {
    sprite: Phaser.GameObjects.Sprite;
    body: Phaser.Physics.Arcade.Body;
  }
}
