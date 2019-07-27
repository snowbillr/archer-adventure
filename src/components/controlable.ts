import 'phaser'

export class Controlable implements Controlable.Component {
  private scene: Phaser.Scene;
  private controls: Controlable.Controls;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.controls = {};
  }

  create() {
    this.controls = this.scene.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
    }) as Controlable.Controls;
  }

  getControls() {
    return this.controls;
  }

  update(body: Phaser.Physics.Arcade.Body) {
    // friction slowing the player down to 0
    if ((body.velocity.x >= 0 && body.acceleration.x <= 0)
        || (body.velocity.x <= 0 && body.acceleration.x >= 0)) {
      if (Phaser.Math.Within(body.velocity.x, 0, 100)) {
        body.acceleration.x = 0;
        body.velocity.x = 0;
      }
    }
  }
}
