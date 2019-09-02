declare namespace Systems.HasSprite {
  interface Entity {
    sprite: Phaser.GameObjects.Sprite;
  }
}

declare namespace Systems.HasPhysicalSprite {
  interface Entity {
    sprite: Phaser.GameObjects.Sprite;
    body: Phaser.Physics.Arcade.Body;
  }
}

declare namespace Systems.HasInteractionCircle {
  interface Entity {
    interactionCircle: Phaser.Geom.Circle;
    debugInteractionCircle?: Phaser.GameObjects.Shape;
  }
}

declare namespace Systems.HasIndicator {
  interface Entity {
    showIndicator: () => void;
    hideIndicator: () => void;
  }
}

declare namespace Systems.HasControls {
  type Controls = { [control: string]: Phaser.Input.Keyboard.Key };

  interface Entity {
    controls: Controls;
  }
}

declare namespace Systems.HasAreaBoundary {
  type AreaBoundary = {
    left: number,
    right: number
  };

  interface Entity {
    areaBoundary: AreaBoundary;
  }
}

declare namespace Systems.HasBounds {
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

  interface Entity {
    boundsFrames: Frame[];
  }
}

declare namespace Systems.HasHurtboxes {
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

  interface Entity {
    hurtboxFrames: Frame[];

    rectanglePool: Phaser.Geom.Rectangle[];
    activeRectangles: Phaser.Geom.Rectangle[];

    debugRectangles: Phaser.GameObjects.Rectangle[];
    debug: boolean;
    debugPointerPosition: any;
    debugColor: number;
  }
}

declare namespace Systems.HasPhiniteStateMachine {
  interface Entity<T> {
    phiniteStateMachine: PhiniteStateMachine.PhiniteStateMachine<T>;
  }
}
