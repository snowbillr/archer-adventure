import 'phaser';

export enum TransitionType {
  Input,
  AnimationEnd,
}

export class PhiniteState<T extends Renderable.IsRenderable> implements PhiniteState.Component<T> {
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
    this.transition(this.currentState.id);
  }

  update() {
    if (this.currentState.onUpdate) {
      this.currentState.onUpdate(this.entity);
    }
  }

  private transition(to: string | PhiniteState.TransitionToFn<T>) {
    this.cancelTransitionTriggers();

    const nextStateId = typeof to === 'string' ? to : to(this.entity);
    this.currentState = this.states.find(state => state.id === nextStateId) as PhiniteState.State<T>;

    if (this.currentState.onEnter) {
      this.currentState.onEnter(this.entity);
    }
    this.registerTransitionTriggers();
  }

  cancelTransitionTriggers() {
    this.triggerCancelers.forEach(canceler => canceler());
    this.triggerCancelers = [];
  }

  registerTransitionTriggers() {
    this.currentState.transitions.forEach(transition => {
      switch(transition.type) {
        case TransitionType.Input:
          this.registerInputTransitionTrigger(transition as PhiniteState.InputTransition<T>);
          break;
        case TransitionType.AnimationEnd:
          this.registerAnimationEndTransitionTrigger(transition as PhiniteState.AnimationEndTransition<T>);
          break;
      }
    });
  }

  registerInputTransitionTrigger(transition: PhiniteState.InputTransition<T>) {
    const listener = (e: KeyboardEvent) => {
      if (e.key === transition.key) {
        this.transition(transition.to);
      }
    }

    this.scene.input.keyboard.on(transition.event, listener);
    this.triggerCancelers.push(() => this.scene.input.keyboard.off(transition.event, listener));
  }

  registerAnimationEndTransitionTrigger(transition: PhiniteState.AnimationEndTransition<T>) {
    const listener = () => {
      this.transition(transition.to);
    }

    this.entity.sprite.anims.currentAnim.on(Phaser.Animations.Events.ANIMATION_COMPLETE, listener);
    this.triggerCancelers.push(() => this.entity.sprite.anims.currentAnim.off(Phaser.Animations.Events.ANIMATION_COMPLETE, listener))
  }
}
