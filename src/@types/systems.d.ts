declare namespace Systems {
  type Renderable = {
    sprite?: Phaser.GameObjects.Sprite;
  }

  type Interactable = {
    interactionCircle?: Phaser.Geom.Circle;
    debugInteractionCircle?: Phaser.GameObjects.Shape;
  }

  type HasIndicator = {
    showIndicator: () => void;
    hideIndicator: () => void;
  }
}
