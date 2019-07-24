import 'phaser';

type Transition = {
  event: string,
  key: string,
  to: string,
}

type State = {
  id: string,
  animationKey: string,
  onEnter?: (sprite: Phaser.GameObjects.Sprite) => void,
  transitions: Transition[],
}

export class SimpleScene extends Phaser.Scene {
  private xVelocity: number = 0;
  private xDirection: number = 0;

  private currentState: State;
  private states: State[] = [];

  private sprite!: Phaser.GameObjects.Sprite;

  preload() {
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('adventurer-bow', '/assets/sprites/adventurer/adventurer-bow.png', { frameWidth: 50, frameHeight: 37 })
  }

  create() {
    this.anims.create({
      key: 'adventurer-idle',
      frames: this.anims.generateFrameNumbers('adventurer-core', { start: 0, end: 3 }),
      repeat: -1,
      frameRate: 4,
    });

    this.anims.create({
      key: 'adventurer-run',
      frames: this.anims.generateFrameNumbers('adventurer-core', { start: 8, end: 13 }),
      repeat: -1,
      frameRate: 8,
    });

    this.anims.create({
      key: 'adventurer-crouch',
      frames: this.anims.generateFrameNumbers('adventurer-core', { start: 4, end: 7 }),
      repeat: -1,
      frameRate: 4,
    });

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
        onEnter(sprite: Phaser.GameObjects.Sprite) {
          sprite.flipX = false;
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
        onEnter(sprite: Phaser.GameObjects.Sprite) {
          sprite.flipX = true;
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
          this.sprite.anims.play(this.currentState.animationKey, true);
          if (this.currentState.onEnter) {
            this.currentState.onEnter(this.sprite);
          }
        }
      });
    });


    this.sprite = this.add.sprite(200, 200, 'adventurer-core');
    this.sprite.setScale(2);
    // this.sprite.anims.play('adventurer-idle');

  }

  update() {
    this.sprite.x += this.xVelocity * this.xDirection;
  }
}
