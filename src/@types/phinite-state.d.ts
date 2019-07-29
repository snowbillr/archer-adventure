declare namespace PhiniteState {
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

  interface Component<T> {
    create(): void;
    update(): void;
  }
}

