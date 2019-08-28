declare namespace Systems {
  type HasSprite = {
    sprite?: Phaser.GameObjects.Sprite;
  }

  type HasPhysicalSprite = {
    sprite: Phaser.GameObjects.Sprite;
    body: Phaser.Physics.Arcade.Body;
  }

  type HasInteractionCircle = {
    interactionCircle?: Phaser.Geom.Circle;
    debugInteractionCircle?: Phaser.GameObjects.Shape;
  }

  type HasIndicator = {
    showIndicator: () => void;
    hideIndicator: () => void;
  }
}
