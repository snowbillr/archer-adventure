declare namespace PhiniteStateMachine {
  type Entity = object;

  type PhiniteStateMachine = {
    doTransition: (transition: PhiniteStateMachine.Transitions.Transition) => void;
    update: () => void;
  }

  namespace States {
    type State = {
      id: string;
      transitions: Transitions.Transition[];
      data?: {[key: string]: any},
      onEnter?: StateCallbackFn;
      onUpdate?: StateCallbackFn;
    }

    type StateCallbackFn = (entity: Entity, data: StateData) => void;

    type StateData = {
      [key: string]: any;
    }

    type StateMergeFn = (state1: Partial<State>, state2: Partial<State>) => State;
  }

  namespace Transitions {
    type TransitionToFn = (entity: Entity) => string;
    type TransitionType = number;

    type BaseTransition = {
      type: TransitionType;
      to: string | TransitionToFn;
      onTransition?: (entity: Entity) => void;
    }

    type InputTransition = BaseTransition & {
      event: string;
      key: string;
    }

    type CurrentAnimationEndTransition = BaseTransition;

    type ConditionalTransition = BaseTransition & {
      condition: (entity: Entity) => boolean;
    }

    type Transition = BaseTransition | InputTransition | CurrentAnimationEndTransition | ConditionalTransition;
  }
}
