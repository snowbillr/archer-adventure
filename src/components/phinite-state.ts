import 'phaser';

export enum TransitionType {
  Input,
  Animation,
}

// only care about the `currentState`
// when transitioning to a new state
  // register its transition triggers (like a key event, or an animation finishing)
  // run its onEnter function
// when transitioning away from a state
  // cancel its transition triggers

export class PhiniteState<T extends HasPhiniteState<T>> implements PhiniteState.Component<T> {
  private scene: Phaser.Scene;
  private entity: T;
  private states: PhiniteState.State<T>[];

  private currentState: PhiniteState.State<T>;
  private triggerCancelers: (() => void)[];

  constructor(scene: Phaser.Scene, entity: T, states: PhiniteState.State<T>[], initialState: PhiniteState.State<T>) {
    this.scene = scene;
    this.entity = entity;
    this.states = states;

    this.currentState = initialState;
    this.triggerCancelers = [];
  }

  create() {
    // register transition handlers
    // call onEnter
    this.transition(this.currentState.id);
  }

  private transition(toId: string) {
    this.cancelTransitionTriggers();
    this.currentState = this.states.find(state => state.id === toId) as PhiniteState.State<T>;
    this.registerTransitionTriggers();

    if (this.currentState.onEnter) {
      this.currentState.onEnter(this.entity);
    }
  }

  cancelTransitionTriggers() {
    this.triggerCancelers.forEach(canceler => canceler());
    this.triggerCancelers = [];
  }

  registerTransitionTriggers() {
    this.currentState.transitions.forEach(transition => {
      switch(transition.type) {
        case TransitionType.Input:
          this.registerInputTransitionTrigger(transition as PhiniteState.InputTransition);
          break;
      }
    });
  }

  registerInputTransitionTrigger(transition: PhiniteState.InputTransition) {
    const listener = (e: KeyboardEvent) => {
      if (e.key === transition.key) {
        this.transition(transition.to);
      }
    }

    this.scene.input.keyboard.on(transition.event, listener);
    this.triggerCancelers.push(() => this.scene.input.keyboard.off(transition.event, listener));
  }

  /*
  private registerInputTransitionHandler(transitions: PhiniteState.Transition[]) {
    const transitionKeyboardEventTypes = [Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, Phaser.Input.Keyboard.Events.ANY_KEY_UP];

    transitionKeyboardEventTypes.forEach(eventType => {
      this.scene.input.keyboard.on(eventType, (e: any) => {
        const transition = transitions.find(transition => {
          return transition.from === this.currentState.id
          && transition.event === eventType
          && transition.key === e.key;
        });

        if (transition) {
          this.transition(this.currentState, <PhiniteState.State<T>> this.states.find(state => state.id === transition.to));
        }
      });
    });
  }

  private registerAnimationTransitionHandler(transitions: PhiniteState.Transition[]) {
    transitions.forEach(transition => {
      const fromState = <PhiniteState.State<T>> this.states.find(state => transition.from === state.id);
      const fromStateOnEnter = fromState.onEnter;

      fromState.onEnter = (entity: T) => {

      }
    })
  }
  */

}
