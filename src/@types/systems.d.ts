declare namespace Systems.HasSprite {
  interface Entity extends SystemsManager.Entity {
    sprite: Phaser.GameObjects.Sprite;
  }
}

declare namespace Systems.HasPhysicalSprite {
  interface Entity extends SystemsManager.Entity, Systems.HasSprite.Entity {
    body: Phaser.Physics.Arcade.Body;
  }
}

declare namespace Systems.HasInteractionCircle {
  interface Entity extends SystemsManager.Entity, Systems.HasSprite.Entity {
    interactionCircle: Phaser.Geom.Circle;
    enteringInteractionIds: Set<string>;
    activeInteractionIds: Set<string>;
    exitingInteractionIds: Set<string>;
    interactionControl?: string;
    debugInteractionCircle?: Phaser.GameObjects.Shape;
  }
}

declare namespace Systems.HasIndicator {
  interface Entity extends SystemsManager.Entity, Systems.HasSprite.Entity {
    indicatorSprite: Phaser.GameObjects.Sprite;
    showIndicator: () => void;
    hideIndicator: () => void;
  }
}

declare namespace Systems.HasControls {
  type Controls = { [control: string]: Phaser.Input.Keyboard.Key };
  type Codes = { [code: string]: string };

  interface Entity extends SystemsManager.Entity {
    controls: Controls;
    codes: Codes;
  }
}

declare namespace Systems.HasAreaBoundary {
  type AreaBoundary = {
    left: number,
    right: number
  };

  interface Entity extends SystemsManager.Entity {
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

  interface Entity extends SystemsManager.Entity, Systems.HasPhysicalSprite.Entity {
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

  interface Entity extends SystemsManager.Entity, Systems.HasSprite.Entity {
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
  interface Entity<T> extends SystemsManager.Entity {
    phiniteStateMachine: PhiniteStateMachine.PhiniteStateMachine<T>;
  }
}

declare namespace Systems.SignSystem {
  interface SignData {
    message: string;
  }

  interface SignEntity extends SystemsManager.Entity, Systems.HasInteractionCircle.Entity, Systems.HasIndicator.Entity {
    textboxSprite: Phaser.GameObjects.Container;
    textboxShowTween: Phaser.Tweens.Tween;
    textboxHideTween: Phaser.Tweens.Tween;
    isTextboxShowing: boolean;
    showTextbox: () => void;
    hideTextbox: () => void;
  }

  interface SignInteractorEntity extends SystemsManager.Entity, Systems.HasInteractionCircle.Entity, Systems.HasControls.Entity {}
}

declare namespace Systems.DoorSystem {
  interface DoorEntity extends SystemsManager.Entity, Systems.HasInteractionCircle.Entity, Systems.HasIndicator.Entity {
    toKey: string;
    toMarker: string;
  }

  interface DoorInteractorEntity extends SystemsManager.Entity, Systems.HasInteractionCircle.Entity, Systems.HasControls.Entity {
  }
}

declare namespace Systems.ShootsArrows {
  interface Entity extends SystemsManager.Entity, Systems.HasSprite.Entity {
    shotPower: number;
    minShotPower: number;
    maxShotPower: number;
    shotChargeRate: number;

    arrows: Entities.Arrow[];
    arrowColliders: Phaser.Physics.Arcade.Collider[];
    shootArrow: () => void;
  }
}
