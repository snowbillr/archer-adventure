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


  type HasBoundsFrame = {
    key: string;
    frame: number | string;
    bounds: HasBoundsBounds;
  }
  type HasBoundsBounds = {
    offset: {
      x: number;
      y: number;
    },
    size: {
      width: number;
      height: number;
    }
  }
  type HasBounds = {
    boundsFrames: HasBoundsFrame[];
  }
}
