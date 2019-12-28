import { Progression } from "../lib/progression";
import { PERSISTENCE_KEYS } from "../constants/persistence-keys";
import { BasePersistenceDocument } from "../lib/persistence/persistence-document";

const SAVE_GAME_KEY = 'archer-adventure-save-game';

class AdventurerDocument extends BasePersistenceDocument {
  public maxHealth: number;
  public health: number;

  constructor() {
    super(['maxHealth', 'health']);

    this.maxHealth = 0;
    this.health = 0;
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
}

export class PersistencePlugin extends Phaser.Plugins.BasePlugin {
  private data: { [key: string]: any };

  public progression: Progression;

  public adventurer: AdventurerDocument;
  public location: LocationDocument;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.data = {};

    this.progression = new Progression();

    this.adventurer = new AdventurerDocument();
    this.location = new LocationDocument();
  }
  
  hasSaveGame() {
    return localStorage.getItem(SAVE_GAME_KEY) != null;
  }

  save() {
    this.data[PERSISTENCE_KEYS.progression] = this.progression.progressionCompletion;
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
