import { BaseScene } from "./base-scene";

import { SCENE_KEYS } from "../constants/scene-keys";
import { PERSISTENCE_KEYS } from "../constants/persistence-keys";

export class NewGameScene extends BaseScene {
  constructor() {
    super({ key: SCENE_KEYS.newGame });
  }

  create() {
    // this.persistence.set(PERSISTENCE_KEYS.adventurer.maxHealth, 5);
    // this.persistence.set(PERSISTENCE_KEYS.adventurer.health, 5);
    this.persistence.adventurer.maxHealth = 5;
    this.persistence.adventurer.health = 5;
    this.persistence.set(PERSISTENCE_KEYS.currentArea, 'woollards-farm');
    this.persistence.set(PERSISTENCE_KEYS.currentMarker, 'adventurerStart');

    this.persistence.save();

    this.scene.start(SCENE_KEYS.continueGame);
  }
}
