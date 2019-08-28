declare namespace Systems {
  type Renderable = {
    sprite?: Phaser.GameObjects.Sprite;
  }

  type Interactable = {
    interactionCircle?: Phaser.Geom.Circle;
  }

  type HasIndicator = {
    showIndicator: () => void;
    hideIndicator: () => void;
  }
}
