declare namespace Controlable {
  type Controls = {
    [control: string]: Phaser.Input.Keyboard.Key
  }

  interface Component {
    create: () => void;
    getControls: () => Controls;
    update: (body: Phaser.Physics.Arcade.Body) => void;
  }

  interface IsControlable {
    controls: Controls;
    controlable: Component;
  }
}
