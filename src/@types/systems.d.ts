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
}

declare namespace Systems.HasHitboxes {
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
    hitboxes: Shape[];
  }
}

declare namespace Systems.SignSystem {
  interface SignData {
    message: string;
  }
}
