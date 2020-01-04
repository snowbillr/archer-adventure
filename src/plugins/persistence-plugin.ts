import { ProgressionDocument } from "../persistence/progression/progression-document";
import { AdventurerDocument } from "../persistence/adventurer-document";
import { LocationDocument } from "../persistence/location-document";

const SAVE_GAME_KEY = 'archer-adventure-save-game';

export class PersistencePlugin extends Phaser.Plugins.BasePlugin {
  private data: { [key: string]: any };

  public progression: ProgressionDocument;
  public adventurer: AdventurerDocument;
  public location: LocationDocument;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.data = {};

    this.progression = new ProgressionDocument();
    this.adventurer = new AdventurerDocument();
    this.location = new LocationDocument();
  }
  
  hasSaveGame() {
    return localStorage.getItem(SAVE_GAME_KEY) != null;
  }

  resetSaveGame() {
    if (this.hasSaveGame()) {
      this.progression.reset();
      this.adventurer.reset();
      this.location.reset();
      this.save();
    }
  }

  save() {
    this.data.progression = this.progression.toJson();
    this.data.adventurer = this.adventurer.toJson();
    this.data.location = this.location.toJson();

    localStorage.setItem(SAVE_GAME_KEY, JSON.stringify(this.data));
  }

  load() {
    const savedData = localStorage.getItem(SAVE_GAME_KEY);
    if (savedData) {
      this.data = JSON.parse(savedData);

      this.progression.fromJson(this.data.progression);
      this.adventurer.fromJson(this.data.adventurer);
      this.location.fromJson(this.data.location);
    } else {
      throw new Error('PERSISTENCE_PLUGIN::NO_SAVED_DATA');
    }
  }
}
