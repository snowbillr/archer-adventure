type OnChangeCallback<T> = (value: T) => void;
type OnChangeCleanupFn = () => void;

export abstract class BasePersistenceDocument implements Persistence.Document {
  private propNames: string[];
  private onChangeListeners: { [key: string]: OnChangeCallback<any>[] };
  private data: { [key: string]: any };

  constructor(propNames: string[]) {
    this.propNames = propNames;
    this.onChangeListeners = {};
    this.data = {};

    Object.defineProperties(this, propNames.reduce((propsConfig, propName) => {
      const config = {
        get(this: Persistence.Document): any {
          return this.data[propName];
        },
        set(this: Persistence.Document, value: any) {
          this.data[propName] = value;
          (this.onChangeListeners[propName] || []).forEach((listener: OnChangeCallback<any>) => listener(value));
        }
      };

      propsConfig[propName] = config;
      return propsConfig;
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

  toJson() {
    return this.propNames.reduce((json, propName) => {
      json[propName] = this.data[propName];
      return json;
    }, {} as any);
  }

  fromJson(json: Record<string, any>) {
    this.propNames.forEach(propName => {
      this.data[propName] = json[propName];
    })
  }

  abstract reset(): void;
}