declare namespace Controlable {
  type Controls = {
    [control: string]: Phaser.Input.Keyboard.Key
  }

  interface Component {
    create: () => void;
    getControls: () => Controls;
  }

  interface Entity {
    controls: Controls;
    controlable: Component;
  }
}
