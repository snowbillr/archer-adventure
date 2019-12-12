type UpdateCallback<T> = (value: T) => T;
type OnChangeCallback<T> = (value: T) => void;

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

  onChange<T>(key: string, onChangeCallback: OnChangeCallback<T>) {
    this.onChangeListeners[key] = this.onChangeListeners[key] || [];
    this.onChangeListeners[key].push(onChangeCallback);
  }
}
