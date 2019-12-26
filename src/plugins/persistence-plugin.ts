type UpdateCallback<T> = (value: T) => T;
type OnChangeCallback<T> = (value: T) => void;
type OnChangeCleanupFn = () => void;

export class PersistencePlugin extends Phaser.Plugins.BasePlugin {
  private data: { [key: string]: any };
  private onChangeListeners: { [key: string]: OnChangeCallback<any>[] };

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.data = {};
    this.onChangeListeners = {};
  }
  
  get<T>(key: string): T {
    return this.data[key] as T;
  }

  update<T>(key: string, updateCallback: UpdateCallback<T>) {
    const newValue = updateCallback(this.data[key]);
    this.set<T>(key, newValue);
  }

  set<T>(key: string, value: T) {
    this.data[key] = value;
    (this.onChangeListeners[key] || []).forEach(listener => listener(value));
  }

  onChange<T>(key: string, onChangeCallback: OnChangeCallback<T>): OnChangeCleanupFn {
    this.onChangeListeners[key] = this.onChangeListeners[key] || [];
    this.onChangeListeners[key].push(onChangeCallback);

    return () => {
      const callbackIndex = this.onChangeListeners[key].findIndex(callback => callback == onChangeCallback);
      this.onChangeListeners[key].splice(callbackIndex, 1);
    }
  }

  save() {
    localStorage.setItem('archer-adventure-save-game', JSON.stringify(this.data));
  }

  load() {
    const savedData = localStorage.getItem('archer-adventure-save-game');
    if (savedData) {
      this.data = JSON.parse(savedData);
    } else {
      throw new Error('PERSISTENCE_PLUGIN::NO_SAVED_DATA');
    }
  }
}
