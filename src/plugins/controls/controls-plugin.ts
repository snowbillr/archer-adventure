import { Control } from "./control";

export class ControlsPlugin extends Phaser.Plugins.ScenePlugin implements Record<Controls.ControlNames, Control> {
  public left: Control;
  public right: Control;
  public up: Control;
  public down: Control;
  public action: Control;
  public shoot: Control;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.left = new Control();
    this.right = new Control();
    this.up = new Control();
    this.down = new Control();
    this.action = new Control();
    this.shoot = new Control();
  }

  start() {
    this.startListening();
    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
  }

  stop() {
    this.scene.events.off(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
    this.shutdown();
  }

  private startListening() {
    this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.onPress, this);
    this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_UP, this.onRelease, this);
  }

  private shutdown() {
    this.scene.input.keyboard.off(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.onPress, this);
    this.scene.input.keyboard.off(Phaser.Input.Keyboard.Events.ANY_KEY_UP, this.onRelease, this);

    this.left.destroy();
    this.right.destroy();
    this.up.destroy();
    this.down.destroy();
    this.action.destroy();
    this.shoot.destroy();
  }

  private onPress(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowLeft': 
        this.left.press();
        break;
      case 'ArrowRight': 
        this.right.press();
        break;
      case 'ArrowUp': 
        this.up.press();
        break;
      case 'ArrowDown': 
        this.down.press();
        break;
      case 'KeyF': 
        this.action.press();
        break;
      case 'Space': 
        this.shoot.press();
        break;
    }
  }

  private onRelease(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowLeft': 
        this.left.release();
        break;
      case 'ArrowRight': 
        this.right.release();
        break;
      case 'ArrowUp': 
        this.up.release();
        break;
      case 'ArrowDown': 
        this.down.release();
        break;
      case 'KeyF': 
        this.action.release();
        break;
      case 'Space': 
        this.shoot.release();
        break;
    }
  }
}
