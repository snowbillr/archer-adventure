declare namespace PhiniteStateMachine {
  type Entity = object;

  interface PhiniteStateMachine<T> {
    currentState: States.State<T>;
    doTransition: (transition: PhiniteStateMachine.Transitions.Transition<T>) => void;
    update: () => void;
    destroy: () => void;
  }

  namespace States {
    type State<T> = {
      id: string;
      transitions: Transitions.Transition<T>[];
      data?: {[key: string]: any},
      onEnter?: (entity: T, data: StateData) => void;
      onUpdate?: (entity: T, data: StateData) => void;
      onLeave?: (entity: T, data: StateData) => void;
    }

    type StateData = {
      [key: string]: any;
    }

    type StateMergeFn = <T>(state1: any, state2: any) => State<T>;
  }

  namespace Transitions {
    type TransitionType = number;

    interface TransitionCallbackFn {
      <T>(entity: T): void;
    }

    type BaseTransition<T> = {
      type?: TransitionType;
      to: string | ((entity: T) => string);
      onTransition?: (entity: T) => void;
    }

    type PressControlTransition<T> = BaseTransition<T> & {
      control: Controls.ControlNames;
    }

    type ReleaseControlTransition<T> = BaseTransition<T> & {
      control: Controls.ControlNames;
    }

    type ConditionalTransition<T> = BaseTransition<T> & {
      condition: (entity: T) => boolean;
    }

    type TimerTransition<T> = BaseTransition<T> & {
      delay: number | (() => number);
    }

    type Transition<T> = BaseTransition<T> | PressControlTransition<T> | ReleaseControlTransition<T> | ConditionalTransition<T> | TimerTransition<T>;
  }
}
