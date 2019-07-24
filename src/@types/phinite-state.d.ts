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
