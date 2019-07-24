export class PhiniteState<T> {
  private scene: Phaser.Scene;
  private entity: T;
  private states: State<T>[];

  private currentState: State<T>;

  constructor(scene: Phaser.Scene, entity: T, states: State<T>[], initialState: State<T>) {
    this.scene = scene;
    this.entity = entity;
    this.states = states;

    this.currentState = initialState;
  }

  create() {
    const transitionEventTypes = [Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, Phaser.Input.Keyboard.Events.ANY_KEY_UP];

    transitionEventTypes.forEach(eventType => {
      this.scene.input.keyboard.on(eventType, e => {
        const transition = this.currentState.transitions
          .filter(transition => transition.event === eventType)
          .find(transition => transition.key === e.key);

        if (transition) {
          this.currentState = <State<T>> this.states.find(state => state.id === transition.to);
          if (this.currentState.onEnter) {
            this.currentState.onEnter(this.entity);
          }
        }
      });
    });
  }
}
