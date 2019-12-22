import { generateUuid } from "../utilities/uuid-util";

type Listener = () => void;

type ListenerConfig = {
  id: string,
  context: any,
  callback: Listener;
};

type ControlOption = 'action' | 'shoot' | 'left' | 'right' | 'up' | 'down';

class Control {
  private onPressListeners: ListenerConfig[];
  private onReleaseListeners: ListenerConfig[];

  public isPressed: boolean;

  constructor() {
    this.onPressListeners = [];
    this.onReleaseListeners = [];

    this.isPressed = false;
  }

  onPress(callback: Listener, context?: any) {
    const id = generateUuid();

    this.onPressListeners.push({
      id,
      context,
      callback,
    });

    return () => {
      const listenerIndex = this.onPressListeners.findIndex(listener => listener.id === id);
      this.onPressListeners.splice(listenerIndex, 1);
    }
  }

  onRelease(callback: Listener, context?: any) {
    const id = generateUuid();

    this.onReleaseListeners.push({
      id,
      context,
      callback,
    });

    return () => {
      const listenerIndex = this.onReleaseListeners.findIndex(listener => listener.id === id);
      this.onReleaseListeners.splice(listenerIndex, 1);
    }
  }

  press() {
    if (!this.isPressed) {
      for (let listener of this.onPressListeners) {
        listener.callback.call(listener.context);
      }
    }

    this.isPressed = true;
  }

  release() {
    if (this.isPressed) {
      for (let listener of this.onReleaseListeners) {
        listener.callback.call(listener.context);
      }
    }

    this.isPressed = false;
  }

  destroy() {
    this.onPressListeners = [];
    this.onReleaseListeners = [];
  }
}

export class ControlsPlugin extends Phaser.Plugins.ScenePlugin {
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

    scene.events.on(Phaser.Scenes.Events.START, this.startListening, this);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
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
