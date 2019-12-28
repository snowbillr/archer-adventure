import { Progression } from "../lib/progression";
import { PERSISTENCE_KEYS } from "../constants/persistence-keys";
import { BasePersistenceDocument } from "../lib/persistence/persistence-document";

type UpdateCallback<T> = (value: T) => T;
type OnChangeCallback<T> = (value: T) => void;
type OnChangeCleanupFn = () => void;

const SAVE_GAME_KEY = 'archer-adventure-save-game';

class AdventurerDocument extends BasePersistenceDocument {
  public maxHealth: number;
  public health: number;

  constructor() {
    super(['maxHealth', 'health']);

    this.maxHealth = 0;
    this.health = 0;
  }

  toJson() {
    return {
      maxHealth: this.maxHealth,
      health: this.health
    };
  }

  fromJson(json: { [key: string]: any }) {
    this.maxHealth = json.maxHealth;
    this.health = json.health;
  }
}

class LocationDocument extends BasePersistenceDocument {
  public areaKey: string;
  public markerName: string;

  constructor() {
    super(['areaKey', 'markerName']);

    this.areaKey = '';
    this.markerName = '';
  }

  toJson() {
    return {
      areaKey: this.areaKey,
      markerName: this.markerName,
    };
  }

  fromJson(json: { [key: string]: any }) {
    this.areaKey = json.areaKey;
    this.markerName = json.markerName;
  }
}

export class PersistencePlugin extends Phaser.Plugins.BasePlugin {
  private data: { [key: string]: any };
  private onChangeListeners: { [key: string]: OnChangeCallback<any>[] };

  public progression: Progression;

  public adventurer: AdventurerDocument;
  public location: LocationDocument;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.data = {};
    this.onChangeListeners = {};

    this.progression = new Progression();

    this.adventurer = new AdventurerDocument();
    this.location = new LocationDocument();
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

  hasSaveGame() {
    return localStorage.getItem(SAVE_GAME_KEY) != null;
  }

  save() {
    this.set(PERSISTENCE_KEYS.progression, this.progression.progressionCompletion);
    this.data.adventurer = this.adventurer.toJson();
    this.data.location = this.location.toJson();
    localStorage.setItem(SAVE_GAME_KEY, JSON.stringify(this.data));
  }

  load() {
    const savedData = localStorage.getItem(SAVE_GAME_KEY);
    if (savedData) {
      this.data = JSON.parse(savedData);
      this.progression.setCompletionData(this.data[PERSISTENCE_KEYS.progression]);
      this.adventurer.fromJson(this.data.adventurer);
      this.location.fromJson(this.data.location);
    } else {
      throw new Error('PERSISTENCE_PLUGIN::NO_SAVED_DATA');
    }
  }
}
