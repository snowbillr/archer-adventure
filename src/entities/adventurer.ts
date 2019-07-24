import { PhiniteState } from '../components/phinite-state';

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

export class Adventurer {
  public sprite!: Phaser.GameObjects.Sprite

  public phiniteState!: PhiniteState<Adventurer>;

  create(scene: Phaser.Scene) {
    this.sprite = scene.add.sprite(200, 200, 'adventurer-core');
    this.sprite.setScale(2);

    this.phiniteState = new PhiniteState<Adventurer>(scene, this, states, <State<Adventurer>> states.find(s => s.id === 'adventurer-idle'));
    this.phiniteState.create();
  }
}
