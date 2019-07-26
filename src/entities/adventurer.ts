import { PhiniteState, TransitionType } from '../components/phinite-state';
import { Renderable } from '../components/renderable';
import { Controlable } from '../components/controlable';

const states: PhiniteState.State<Adventurer>[] = [
  {
    id:'adventurer-idle',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.anims.play('adventurer-idle');
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
      }
    ],
  },
  {
    id: 'adventurer-run-right',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.flipX = false;
      adventurer.sprite.anims.play('adventurer-run');
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
        to: 'adventurer-slide',
      }
    ]
  },
  {
    id: 'adventurer-run-left',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.flipX = true;
      adventurer.sprite.anims.play('adventurer-run');
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
        to: 'adventurer-slide',
      }
    ]
  },
  {
    id: 'adventurer-crouch',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.anims.play('adventurer-crouch');
    },
    transitions: [
      {
        type: TransitionType.Input,
        event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
        key: 'ArrowDown',
        to: 'adventurer-idle',
      }
    ]
  },
  {
    id: 'adventurer-slide',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.anims.play('adventurer-slide')
    },
    transitions: [
      {
        type: TransitionType.AnimationEnd,
        animationKey: 'adventurer-slide',
        to: (adventurer: Controlable.IsControlable) => {
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

export class Adventurer implements HasPhiniteState<Adventurer>, IsRenderable, Controlable.IsControlable {
  public sprite!: Phaser.GameObjects.Sprite
  public phiniteState!: PhiniteState.Component<Adventurer>;
  public controls!: Controlable.Controls;

  create(scene: Phaser.Scene) {
    const renderable = new Renderable(scene, 200, 200, 'adventurer-core');
    renderable.create();
    this.sprite = renderable.getSprite();
    this.sprite.setScale(2);

    const controlable = new Controlable(scene);
    controlable.create();
    this.controls = controlable.getControls();

    this.phiniteState = new PhiniteState<Adventurer>(scene, this, states, <PhiniteState.State<Adventurer>> states.find(s => s.id === 'adventurer-idle'));
    this.phiniteState.create();
  }
}
