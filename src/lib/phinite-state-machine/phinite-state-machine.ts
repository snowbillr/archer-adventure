import 'phaser';

import { TransitionType } from './transition-type';

export class PhiniteStateMachine implements PhiniteStateMachine.PhiniteStateMachine {
  private scene: Phaser.Scene;
  private entity: object;
  private states: PhiniteStateMachine.States.State[];

  private currentState: PhiniteStateMachine.States.State;
  private triggerCancelers: (() => void)[];

  constructor(scene: Phaser.Scene, entity: PhiniteStateMachine.Entity, states: PhiniteStateMachine.States.State[]) {
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

  doTransition(transition: PhiniteStateMachine.Transitions.Transition) {
    this.cancelTransitionTriggers();

    const nextStateId = typeof transition.to === 'string' ? transition.to : transition.to(this.entity);
    this.currentState = this.states.find(state => state.id === nextStateId) as PhiniteStateMachine.States.State;

    if (transition.onTransition && transition.type !== TransitionType.Initial) {
      transition.onTransition(this.entity);
    }

    if (this.currentState.onEnter && transition.type !== TransitionType.Initial) {
      this.currentState.onEnter(this.entity, this.currentState.data || {});
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
          this.registerInputTransitionTrigger(transition as PhiniteStateMachine.Transitions.InputTransition);
          break;
        case TransitionType.CurrentAnimationEnd:
          this.registerCurrentAnimationEndTransitionTrigger(transition as PhiniteStateMachine.Transitions.CurrentAnimationEndTransition);
          break;
        case TransitionType.Conditional:
          this.registerConditionalTransitionTrigger(transition as PhiniteStateMachine.Transitions.ConditionalTransition);
          break;
      }
    });
  }

  private registerInputTransitionTrigger(transition: PhiniteStateMachine.Transitions.InputTransition) {
    const listener = (e: KeyboardEvent) => {
      if (e.key === transition.key) {
        this.doTransition(transition);
      }
    }

    this.scene.input.keyboard.on(transition.event, listener);
    this.triggerCancelers.push(() => this.scene.input.keyboard.off(transition.event, listener));
  }

  private registerCurrentAnimationEndTransitionTrigger(transition: PhiniteStateMachine.Transitions.CurrentAnimationEndTransition) {
    const listener = () => {
      this.doTransition(transition);
    }
    // this.entity.sprite!.anims.currentAnim.on(Phaser.Animations.Events.ANIMATION_COMPLETE, listener);
    // this.triggerCancelers.push(() => this.entity.sprite!.anims.currentAnim.off(Phaser.Animations.Events.ANIMATION_COMPLETE, listener))
  }

  private registerConditionalTransitionTrigger(transition: PhiniteStateMachine.Transitions.ConditionalTransition) {
    const listener = () => {
      if (transition.condition(this.entity)) {
        this.doTransition(transition);
      }
    }

    this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, listener);
    this.triggerCancelers.push(() => this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, listener));
  }
}
