declare namespace Systems {
  namespace HasSprite {
    type Entity = {
      sprite?: Phaser.GameObjects.Sprite;
    }
  }

  namespace HasPhysicalSprite {
    type Entity = {
      sprite: Phaser.GameObjects.Sprite;
      body: Phaser.Physics.Arcade.Body;
    }
  }

  namespace HasInteractionCircle {
    type Entity = {
      interactionCircle?: Phaser.Geom.Circle;
      debugInteractionCircle?: Phaser.GameObjects.Shape;
    }
  }

  namespace HasIndicator {
    type Entity = {
      showIndicator: () => void;
      hideIndicator: () => void;
    }
  }

  namespace HasControls {
    type Controls = { [control: string]: Phaser.Input.Keyboard.Key };

    type Entity = {
      controls: Controls;
    }
  }

  namespace HasBounds {
    type Frame = {
      key: string;
      frame: number | string;
      bounds: Bounds;
    }

    type Bounds = {
      offset: {
        x: number;
        y: number;
      },
      size: {
        width: number;
        height: number;
      }
    }

    type Entity = {
      boundsFrames: Frame[];
    }
  }

  namespace HasHurtboxes {
    type Shape = {
      type: "rectangle";
      x: number;
      y: number;
      height: number;
      width: number;
    }

    type Frame = {
      key: string;
      frame: number | string;
      hurtboxes: Shape[];
    }

    type Entity = {
      hurtboxFrames: Frame[];

      rectanglePool: Phaser.Geom.Rectangle[];
      activeRectangles: Phaser.Geom.Rectangle[];

      debugRectangles: Phaser.GameObjects.Rectangle[];
      debug: boolean;
      debugPointerPosition: any;
      debugColor: number;
    }
  }
}
