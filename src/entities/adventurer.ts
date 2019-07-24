import { PhiniteState } from '../components/phinite-state';
import { Renderable } from '../components/renderable';

const states = [
  {
    id:'adventurer-idle',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.anims.play('adventurer-idle', true);
    },
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
    ],
  },
  {
    id: 'adventurer-run-right',
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.flipX = false;
      adventurer.sprite.anims.play('adventurer-run', true);
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
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.flipX = true;
      adventurer.sprite.anims.play('adventurer-run', true);
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
    onEnter(adventurer: Adventurer) {
      adventurer.sprite.anims.play('adventurer-crouch', true);
    },
    transitions: [
      {
        event: 'keyup',
        key: 'ArrowDown',
        to: 'adventurer-idle',
      }
    ]
  }
];

export class Adventurer implements HasPhiniteState<Adventurer>, IsRenderable {
  public sprite!: Phaser.GameObjects.Sprite
  public phiniteState!: PhiniteState.Component<Adventurer>;

  create(scene: Phaser.Scene) {
    // Components
    const renderable = new Renderable(scene, 200, 200, 'adventurer-core');
    renderable.create();

    this.phiniteState = new PhiniteState<Adventurer>(scene, this, states, <PhiniteState.State<Adventurer>> states.find(s => s.id === 'adventurer-idle'));
    this.phiniteState.create();

    // Actual Create
    this.sprite = renderable.getSprite();
    this.sprite.setScale(2);
  }
}
