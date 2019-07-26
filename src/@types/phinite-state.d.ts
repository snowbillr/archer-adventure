declare namespace PhiniteState {
  type State<T> = {
    id: string,
    transitions: Transition<T>[],
    onEnter?: (entity: T) => void,
  }

  type TransitionToFn<T> = (entity: T) => string;

  type BaseTransition<T> = {
    type: TransitionType,
    to: string | TransitionToFn<T>,
  }

  type InputTransition<T> = BaseTransition<T> & {
    event: string,
    key: string,
  }

  type AnimationEndTransition<T> = BaseTransition<T> & {
    animationKey: string
  }

  type Transition<T> = InputTransition<T> | AnimationEndTransition<T>

  interface Component<T> {
    create(): void
  }
}

declare interface HasPhiniteState<T> {
  phiniteState: PhiniteState.Component<T>
}

declare type TransitionType = number;
