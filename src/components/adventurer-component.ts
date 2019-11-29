type Controls = { [control: string]: Phaser.Input.Keyboard.Key };

export class AdventurerComponent implements Phecs.Component {
  public static tag: string = 'adventurer';

  public controls: Controls;
  public codes: { [code: string]: string };

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.controls = scene.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
      'action': Phaser.Input.Keyboard.KeyCodes.F,
      'attack': Phaser.Input.Keyboard.KeyCodes.SPACE,
    }) as Controls;

    this.codes = {
      'up': 'ArrowUp',
      'down': 'ArrowDown',
      'left': 'ArrowLeft',
      'right': 'ArrowRight',
      'action': 'f',
      'attack': ' ',
    }
  }

  destroy() {
    delete this.controls;
  }
}
