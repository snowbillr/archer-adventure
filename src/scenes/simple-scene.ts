import 'phaser';

import { Adventurer } from '../entities/adventurer';

type Transition = {
  event: string,
  key: string,
  to: string,
}

type State = {
  id: string,
  animationKey: string,
  onEnter?: (adventurer: Adventurer) => void,
  transitions: Transition[],
}

export class SimpleScene extends Phaser.Scene {
  private currentState: State;
  private states: State[] = [];

  private adventurer: Adventurer = new Adventurer();

  preload() {
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('adventurer-bow', '/assets/sprites/adventurer/adventurer-bow.png', { frameWidth: 50, frameHeight: 37 })

    this.load.animation('adventurer-animations', '/assets/animations/adventurer.json');
  }

  create() {
    this.states = [
      {
        id:'adventurer-idle',
        animationKey: 'adventurer-idle',
        transitions: [
          {
            event: 'keydown',
            key: 'ArrowRight',
            to: 'adventurer-run-right',
          },
          {
            event: 'keydown',
            key: 'ArrowLeft',
            to: 'adventurer-run-left',
          },
          {
            event: 'keydown',
            key: 'ArrowDown',
            to: 'adventurer-crouch',
          }
        ]
      },
      {
        id: 'adventurer-run-right',
        animationKey: 'adventurer-run',
        onEnter(adventurer: Adventurer) {
          adventurer.sprite.flipX = false;
        },
        transitions: [
          {
            event: 'keyup',
            key: 'ArrowRight',
            to: 'adventurer-idle',
          }
        ]
      },
      {
        id: 'adventurer-run-left',
        animationKey: 'adventurer-run',
        onEnter(adventurer: Adventurer) {
          adventurer.sprite.flipX = true;
        },
        transitions: [
          {
            event: 'keyup',
            key: 'ArrowLeft',
            to: 'adventurer-idle',
          }
        ]
      },
      {
        id: 'adventurer-crouch',
        animationKey: 'adventurer-crouch',
        transitions: [
          {
            event: 'keyup',
            key: 'ArrowDown',
            to: 'adventurer-idle',
          }
        ]
      }
    ];
    this.currentState = <State> this.states.find(state => state.id === 'adventurer-idle');

    const transitionEventTypes = [Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, Phaser.Input.Keyboard.Events.ANY_KEY_UP];
    transitionEventTypes.forEach(eventType => {
      this.input.keyboard.on(eventType, e => {
        const transition = this.currentState.transitions
          .filter(transition => transition.event === eventType)
          .find(transition => transition.key === e.key);

        if (transition) {
          this.currentState = <State> this.states.find(state => state.id === transition.to);
          this.adventurer.sprite.anims.play(this.currentState.animationKey, true);
          if (this.currentState.onEnter) {
            this.currentState.onEnter(this.adventurer);
          }
        }
      });
    });

    this.adventurer.create(this);
  }
}
