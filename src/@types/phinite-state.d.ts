declare namespace PhiniteState {
  type Transition = {
    type: TransitionType,
    to: string,
  }

  type InputTransition = Transition & {
    event: string,
    key: string,
  }

  type AnimationTransition = Transition & {
    animationKey: string
  }

  type State<T> = {
    id: string,
    transitions: (InputTransition | AnimationTransition)[],
    onEnter?: (entity: T) => void,
  }

  interface Component<T> {
    create(): void
  }
}

declare interface HasPhiniteState<T> {
  phiniteState: PhiniteState.Component<T>
}

declare type TransitionType = number;
