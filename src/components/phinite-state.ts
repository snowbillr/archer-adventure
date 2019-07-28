import 'phaser';

export enum TransitionType {
  Initial,

  Input,
  AnimationEnd,
  Conditional,
}

export class PhiniteState<T extends Renderable.Entity> implements PhiniteState.Component<T> {
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
    this.doTransition({
      type: TransitionType.Initial,
      to: this.currentState.id,
    });
  }

  update() {
    if (this.currentState.onUpdate) {
      this.currentState.onUpdate(this.entity);
    }
  }

  private doTransition(transition: PhiniteState.Transition<T>) {
    this.cancelTransitionTriggers();

    const nextStateId = typeof transition.to === 'string' ? transition.to : transition.to(this.entity);
    this.currentState = this.states.find(state => state.id === nextStateId) as PhiniteState.State<T>;

    if (transition.onTransition) {
      transition.onTransition(this.entity);
    }

    if (this.currentState.onEnter) {
      this.currentState.onEnter(this.entity);
    }
    this.registerTransitionTriggers();
  }

  private cancelTransitionTriggers() {
    this.triggerCancelers.forEach(canceler => canceler());
    this.triggerCancelers = [];
  }

  private registerTransitionTriggers() {
    this.currentState.transitions.forEach(transition => {
      switch(transition.type) {
        case TransitionType.Input:
          this.registerInputTransitionTrigger(transition as PhiniteState.InputTransition<T>);
          break;
        case TransitionType.AnimationEnd:
          this.registerAnimationEndTransitionTrigger(transition as PhiniteState.AnimationEndTransition<T>);
          break;
        case TransitionType.Conditional:
          this.registerConditionalTransitionTrigger(transition as PhiniteState.ConditionalTransition<T>);
          break;
      }
    });
  }

  private registerInputTransitionTrigger(transition: PhiniteState.InputTransition<T>) {
    const listener = (e: KeyboardEvent) => {
      if (e.key === transition.key) {
        this.doTransition(transition);
      }
    }

    this.scene.input.keyboard.on(transition.event, listener);
    this.triggerCancelers.push(() => this.scene.input.keyboard.off(transition.event, listener));
  }

  private registerAnimationEndTransitionTrigger(transition: PhiniteState.AnimationEndTransition<T>) {
    const listener = () => {
      this.doTransition(transition);
    }

    this.entity.sprite.anims.currentAnim.on(Phaser.Animations.Events.ANIMATION_COMPLETE, listener);
    this.triggerCancelers.push(() => this.entity.sprite.anims.currentAnim.off(Phaser.Animations.Events.ANIMATION_COMPLETE, listener))
  }

  private registerConditionalTransitionTrigger(transition: PhiniteState.ConditionalTransition<T>) {
    const listener = () => {
      if (transition.condition(this.entity)) {
        this.doTransition(transition);
      }
    }

    this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, listener);
    this.triggerCancelers.push(() => this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, listener));
  }
}
