import { PhiniteState, TransitionType } from '../components/phinite-state';
import { PhysicallyRenderable } from '../components/physically-renderable';
import { Controlable } from '../components/controlable';

const movementAttributes: { [key: string]: number } = {
  maxVelocity: 350,
  horizontalAcceleration: 800,
  horizontalDeceleration: 2000,
  slideVelocityThreshold: 300,
}

const states: PhiniteState.State<Adventurer>[] = [
  {
    id:'adventurer-idle',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.anims.play('adventurer-idle');

      const body = adventurer.sprite.body as Phaser.Physics.Arcade.Body;
      body.acceleration.x = body.velocity.x < 0 ? movementAttributes.horizontalDeceleration : -movementAttributes.horizontalDeceleration;
    },
    onUpdate(adventurer: Adventurer) {
      const body = adventurer.sprite.body as Phaser.Physics.Arcade.Body;
      if (Phaser.Math.Within(body.velocity.x, 0, 100)) {
        body.acceleration.x = 0;
        body.velocity.x = 0;
      }
    },
    transitions: [
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
        key: 'ArrowRight',
        to: 'adventurer-run-right',
      },
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
        key: 'ArrowLeft',
        to: 'adventurer-run-left',
      },
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
        key: 'ArrowDown',
        to: 'adventurer-crouch',
      },
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
        key: 'ArrowUp',
        to: 'adventurer-jump',
      }
    ],
  },
  {
    id: 'adventurer-crouch',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.anims.play('adventurer-crouch');

      const body = adventurer.sprite.body as Phaser.Physics.Arcade.Body;
      body.acceleration.x = body.velocity.x < 0 ? movementAttributes.horizontalDeceleration : -movementAttributes.horizontalDeceleration;
    },
    onUpdate(adventurer: Adventurer) {
      const body = adventurer.sprite.body as Phaser.Physics.Arcade.Body;
      if (Phaser.Math.Within(body.velocity.x, 0, 100)) {
        body.acceleration.x = 0;
        body.velocity.x = 0;
      }
    },
    transitions: [
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
        key: 'ArrowDown',
        to: (adventurer: Adventurer) => {
          if (adventurer.controls.left.isDown) {
            return 'adventurer-run-left';
          } else if (adventurer.controls.right.isDown) {
            return 'adventurer-run-right';
          } else {
            return 'adventurer-idle';
          }
        }
      }
    ]
  },
  {
    id: 'adventurer-run-right',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.flipX = false;
      adventurer.sprite.anims.play('adventurer-run');

      const body = adventurer.sprite.body as Phaser.Physics.Arcade.Body;
      if (body.velocity.x < 0) {
        body.velocity.x += body.velocity.x * 0.5 * -1;
      }
      body.acceleration.x = movementAttributes.horizontalAcceleration;
    },
    transitions: [
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
        key: 'ArrowRight',
        to: 'adventurer-idle',
      },
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
        key: 'ArrowDown',
        to: (adventurer: Adventurer) => {
          if (Math.abs(adventurer.sprite.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
            return 'adventurer-crouch';
          } else {
            return 'adventurer-slide';
          }
        }
      },
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
        key: 'ArrowLeft',
        to: 'adventurer-run-left',
      },
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
        key: 'ArrowUp',
        to: 'adventurer-jump',
      }
    ]
  },
  {
    id: 'adventurer-run-left',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.flipX = true;
      adventurer.sprite.anims.play('adventurer-run');

      const body = adventurer.sprite.body as Phaser.Physics.Arcade.Body;
      if (body.velocity.x > 0) {
        body.velocity.x += body.velocity.x * 0.5 * -1;
      }
      body.acceleration.x = -movementAttributes.horizontalAcceleration;
    },
    transitions: [
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
        key: 'ArrowLeft',
        to: 'adventurer-idle',
      },
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
        key: 'ArrowDown',
        to: (adventurer: Adventurer) => {
          if (Math.abs(adventurer.sprite.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
            return 'adventurer-crouch';
          } else {
            return 'adventurer-slide';
          }
        }
      },
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
        key: 'ArrowRight',
        to: 'adventurer-run-right',
      },
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
        key: 'ArrowUp',
        to: 'adventurer-jump',
      }
    ]
  },
  {
    id: 'adventurer-slide',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.anims.play('adventurer-slide')

      const body = adventurer.sprite.body as Phaser.Physics.Arcade.Body;
      adventurer.sprite.setAccelerationX(-1 * body.acceleration.x * 0.5);
    },
    transitions: [
      {
        type: TransitionType.AnimationEnd,
        animationKey: 'adventurer-slide',
        to: (adventurer: Adventurer) => {
          if (adventurer.controls.left.isDown) {
            return 'adventurer-run-left';
          } else if (adventurer.controls.right.isDown) {
            return 'adventurer-run-right';
          } else {
            return 'adventurer-idle';
          }
        }
      }
    ],
  },
  {
    id: 'adventurer-jump',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.once(`${Phaser.Animations.Events.SPRITE_ANIMATION_KEY_START}adventurer-jump-rise`, () => {
        const body = adventurer.sprite.body as Phaser.Physics.Arcade.Body;
        body.velocity.y = -600;
      });

      adventurer.sprite.anims.play('adventurer-jump-prep');
      adventurer.sprite.anims.chain('adventurer-jump-rise');
    },
    transitions: [
      {
        type: TransitionType.Conditional,
        condition: (adventurer: Adventurer) => {
          const body = adventurer.sprite.body as Phaser.Physics.Arcade.Body;
          return body.velocity.y > 0;
        },
        to: 'adventurer-fall',
      }
    ]
  },
  {
    id: 'adventurer-fall',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.anims.play('adventurer-fall');
    },
    transitions: [
      {
        type: TransitionType.Conditional,
        condition: (adventurer: Adventurer) => {
          const body = adventurer.sprite.body as Phaser.Physics.Arcade.Body;
          return Phaser.Math.Within(body.velocity.y, 0, 5);
        },
        to(adventurer: Adventurer) {
          if (adventurer.controls.left.isDown) {
            return 'adventurer-run-left';
          } else if (adventurer.controls.right.isDown) {
            return 'adventurer-run-right';
          } else {
            return 'adventurer-idle';
          }
        }
      }
    ],
  }
];

export class Adventurer implements PhysicallyRenderable.Entity, Controlable.Entity {
  public sprite!: Phaser.Physics.Arcade.Sprite;
  public controls!: Controlable.Controls;
  public controlable!: Controlable.Component;
  public phiniteState!: PhiniteState<Adventurer>;

  create(scene: Phaser.Scene) {
    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.update());

    const physicallyRenderable = new PhysicallyRenderable(scene, 200, 200, 'adventurer-core');
    physicallyRenderable.create();
    this.sprite = physicallyRenderable.getSprite();
    this.sprite.setScale(2);
    this.sprite.setMaxVelocity(movementAttributes.maxVelocity);

    this.controlable = new Controlable(scene);
    this.controlable.create();
    this.controls = this.controlable.getControls();

    this.phiniteState = new PhiniteState<Adventurer>(scene, this, states, <PhiniteState.State<Adventurer>> states.find(s => s.id === 'adventurer-idle'));
    this.phiniteState.create();
  }

  update() {
    this.phiniteState.update();
  }
}
