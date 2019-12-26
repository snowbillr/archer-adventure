import 'phaser';

import { TransitionType } from './transition-type';
import { BaseScene } from '../../scenes/base-scene';
import { Control, ControlOption } from '../../plugins/controls-plugin';

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
        case TransitionType.PressControl:
          this.registerPressControlTransitionTrigger(transition as PhiniteStateMachine.Transitions.PressControlTransition<T>);
          break;
        case TransitionType.ReleaseControl:
          this.registerReleaseControlTransitionTrigger(transition as PhiniteStateMachine.Transitions.ReleaseControlTransition<T>);
          break;
        case TransitionType.Conditional:
          this.registerConditionalTransitionTrigger(transition as PhiniteStateMachine.Transitions.ConditionalTransition<T>);
          break;
        case TransitionType.Timer:
          this.registerTimerTransitionTrigger(transition as PhiniteStateMachine.Transitions.TimerTransition<T>);
          break;
      }
    });
  }

  private registerPressControlTransitionTrigger(transition: PhiniteStateMachine.Transitions.PressControlTransition<T>) {
    const controls = (this.scene as BaseScene).controls;

    const cancelTriggerFn = (controls[transition.control as ControlOption] as Control).onPress(() => this.doTransition(transition));

    this.triggerCancelers.push(cancelTriggerFn);
  }

  private registerReleaseControlTransitionTrigger(transition: PhiniteStateMachine.Transitions.ReleaseControlTransition<T>) {
    const controls = (this.scene as BaseScene).controls;

    const cancelTriggerFn = (controls[transition.control as ControlOption] as Control).onRelease(() => this.doTransition(transition));

    this.triggerCancelers.push(cancelTriggerFn);
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

  private registerTimerTransitionTrigger(transition: PhiniteStateMachine.Transitions.TimerTransition<T>) {
    const listener = () => {
      this.doTransition(transition);
    }

    const delay = (typeof transition.delay === 'number') ? transition.delay : transition.delay();
    const timer = this.scene.time.delayedCall(delay, listener);

    this.triggerCancelers.push(() => timer.remove());
  }
}
