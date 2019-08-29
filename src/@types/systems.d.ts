declare namespace Systems.HasSprite {
  type Entity = {
    sprite?: Phaser.GameObjects.Sprite;
  }
}

declare namespace Systems.HasPhysicalSprite {
  type Entity = {
    sprite: Phaser.GameObjects.Sprite;
    body: Phaser.Physics.Arcade.Body;
  }
}

declare namespace Systems.HasInteractionCircle {
  type Entity = {
    interactionCircle?: Phaser.Geom.Circle;
    debugInteractionCircle?: Phaser.GameObjects.Shape;
  }
}

declare namespace Systems.HasIndicator {
  type Entity = {
    showIndicator: () => void;
    hideIndicator: () => void;
  }
}

declare namespace Systems.HasControls {
  type Controls = { [control: string]: Phaser.Input.Keyboard.Key };

  type Entity = {
    controls: Controls;
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

  type Entity = {
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

declare namespace Systems.HasPhiniteStateMachine {
  type StateMergeFn<T> = (state1: Partial<State<T>>, state2: Partial<State<T>>) => State<T>;

  type State<T> = {
    id: string;
    transitions: Transition<T>[];
    data?: {[key: string]: any},
    onEnter?: StateCallbackFn<T>;
    onUpdate?: StateCallbackFn<T>;
  }
  type StateData = {
    [key: string]: any;
  }
  type StateCallbackFn<T> = (entity: T, data: StateData) => void;

  type TransitionToFn<T> = (entity: T) => string;
  type TransitionType = number;

  type BaseTransition<T> = {
    type: TransitionType;
    to: string | TransitionToFn<T>;
    onTransition?: (entity: T) => void;
  }

  type InputTransition<T> = BaseTransition<T> & {
    event: string;
    key: string;
  }

  type CurrentAnimationEndTransition<T> = BaseTransition<T>;

  type ConditionalTransition<T> = BaseTransition<T> & {
    condition: (entity: T) => boolean;
  }

  type Transition<T> = BaseTransition<T> | InputTransition<T> | CurrentAnimationEndTransition<T> | ConditionalTransition<T>;
}
