interface PersistenceDocument {
  [key: string]: any;

  toJson(): object;
  fromJson(json: { [key: string]: any }): void;
}

type OnChangeCallback<T> = (value: T) => void;
type OnChangeCleanupFn = () => void;

export abstract class BasePersistenceDocument implements PersistenceDocument {
  private onChangeListeners: { [key: string]: OnChangeCallback<any>[] };
  private data: { [key: string]: any };

  constructor(properties: string[]) {
    this.onChangeListeners = {};
    this.data = {};

    Object.defineProperties(this, properties.reduce((propConfig, propName) => {
      const config = {
        get(this: PersistenceDocument): any {
          return this.data[propName];
        },
        set(this: PersistenceDocument, value: any) {
          this.data[propName] = value;
          (this.onChangeListeners[propName] || []).forEach((listener: OnChangeCallback<any>) => listener(value));
        }
      };

      propConfig[propName] = config;
      return propConfig;
    }, {} as any));
  }

  onChange<T>(key: string, onChangeCallback: OnChangeCallback<T>): OnChangeCleanupFn {
    this.onChangeListeners[key] = this.onChangeListeners[key] || [];
    this.onChangeListeners[key].push(onChangeCallback);

    return () => {
      const callbackIndex = this.onChangeListeners[key].findIndex(callback => callback == onChangeCallback);
      this.onChangeListeners[key].splice(callbackIndex, 1);
    }
  }

  abstract toJson(): object;
  abstract fromJson(json: { [key: string]: any; }): void;
}