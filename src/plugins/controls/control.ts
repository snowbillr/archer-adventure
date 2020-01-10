import { generateUuid } from "../../utilities/uuid-util";

export class Control {
  private onPressListeners: Controls.ListenerConfig[];
  private onReleaseListeners: Controls.ListenerConfig[];

  public isPressed: boolean;

  constructor() {
    this.onPressListeners = [];
    this.onReleaseListeners = [];

    this.isPressed = false;
  }

  onPress(callback: Controls.Listener, context?: any) {
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

  onRelease(callback: Controls.Listener, context?: any) {
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