declare namespace PhiniteState {
  type Transition = {
    event: string,
    key: string,
    to: string,
  }

  type State<T> = {
    id: string,
    transitions: Transition[],
    onEnter?: (entity: T) => void,
  }

  interface Component<T> {
    create(): void
  }
}

declare interface HasPhiniteState<T> {
  phiniteState: PhiniteState.Component<T>
}
