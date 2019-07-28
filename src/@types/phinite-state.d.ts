declare namespace PhiniteState {
  type State<T> = {
    id: string;
    transitions: Transition<T>[];
    onEnter?: (entity: T) => void;
    onUpdate?: (entity: T) => void;
  }

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

  type AnimationEndTransition<T> = BaseTransition<T> & {
    animationKey: string;
  }

  type Transition<T> = BaseTransition<T> | InputTransition<T> | AnimationEndTransition<T>;

  interface Component<T> {
    create(): void;
    update(): void;
  }
}

