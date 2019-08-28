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

  type HasControlsControls = { [control: string]: Phaser.Input.Keyboard.Key };
  type HasControls = {
    controls: HasControlsControls;
  }

  type HasHurtboxHurtboxConfig = {
    type: "rectangle";
    x: number;
    y: number;
    height: number;
    width: number;
  }
  type HasHurtboxesFrame = {
    key: string;
    frame: number | string;
    hitboxes: HasHurtboxHurtboxConfig[];
  }
  type HasHurtboxes = {
    hitboxFrames: HasHurtboxesFrame[];

    rectanglePool: Phaser.Geom.Rectangle[];
    activeRectangles: Phaser.Geom.Rectangle[];

    debugRectangles: Phaser.GameObjects.Rectangle[];
    debug: boolean;
    debugPointerPosition: any;
    debugColor: number;
  }
}
