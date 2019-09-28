import 'phaser';

import { TransitionType } from './transition-type';

export class PhiniteStateMachine<T> implements PhiniteStateMachine.PhiniteStateMachine<T> {
  private scene: Phaser.Scene;
  private entity: T;
  private states: PhiniteStateMachine.States.State<T>[];

  private triggerCancelers: (() => void)[];

  public currentState: PhiniteStateMachine.States.State<T>;

  constructor(scene: Phaser.Scene, entity: T, states: PhiniteStateMachine.States.State<T>[]) {
    this.scene = scene;
    this.entity = entity;
    this.states = states;

    this.currentState = { id: 'dummy', transitions: [] };
    this.triggerCancelers = [];
  }

  update() {
    if (this.currentState.onUpdate) {
      this.currentState.onUpdate(this.entity, this.currentState.data || {});
    }
  }

  doTransition(transition: PhiniteStateMachine.Transitions.Transition<T>) {
    this.cancelTransitionTriggers();

    if (this.currentState.onLeave) {
      this.currentState.onLeave(this.entity, this.currentState.data || {});
    }

    const nextStateId = typeof transition.to === 'string' ? transition.to : transition.to(this.entity);
    this.currentState = this.states.find(state => state.id === nextStateId) as PhiniteStateMachine.States.State<T>;

    if (transition.onTransition && transition.type !== TransitionType.Initial) {
      transition.onTransition(this.entity);
    }

    if (this.currentState.onEnter) {
      this.currentState.onEnter(this.entity, this.currentState.data || {});
    }
    this.registerTransitionTriggers();
  }

  destroy() {
    this.cancelTransitionTriggers();
  }

  private cancelTransitionTriggers() {
    this.triggerCancelers.forEach(canceler => canceler());
    this.triggerCancelers = [];
  }

  private registerTransitionTriggers() {
    this.currentState.transitions.forEach(transition => {
      switch(transition.type) {
        case TransitionType.Input:
          this.registerInputTransitionTrigger(transition as PhiniteStateMachine.Transitions.InputTransition<T>);
          break;
        case TransitionType.Conditional:
          this.registerConditionalTransitionTrigger(transition as PhiniteStateMachine.Transitions.ConditionalTransition<T>);
          break;
      }
    });
  }

  private registerInputTransitionTrigger(transition: PhiniteStateMachine.Transitions.InputTransition<T>) {
    const listener = (e: KeyboardEvent) => {
      const key = typeof transition.key === 'string' ? transition.key : transition.key(this.entity);
      if (e.key === key) {
        this.doTransition(transition);
      }
    }

    this.scene.input.keyboard.on(transition.event, listener);
    this.triggerCancelers.push(() => this.scene.input.keyboard.off(transition.event, listener));
  }

  private registerConditionalTransitionTrigger(transition: PhiniteStateMachine.Transitions.ConditionalTransition<T>) {
    const listener = () => {
      if (transition.condition(this.entity)) {
        this.doTransition(transition);
      }
    }

    this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, listener);
    this.triggerCancelers.push(() => this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, listener));
  }
}
