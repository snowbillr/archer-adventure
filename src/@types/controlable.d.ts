declare namespace Controlable {
  type Controls = {
    [control: string]: Phaser.Input.Keyboard.Key
  }

  interface Component {
    create: () => void;
    getControls: () => Controls;
  }

  interface IsControlable {
    controls: Controls;
    controlable: Component;
  }
}
