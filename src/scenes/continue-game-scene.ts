import { BaseScene } from "./base-scene";

import { SCENE_KEYS } from "../constants/scene-keys";
import { PERSISTENCE_KEYS } from "../constants/persistence-keys";

export class ContinueGameScene extends BaseScene {
  constructor() {
    super({ key: SCENE_KEYS.continueGame });
  }

  create() {
    this.persistence.load();

    this.persistence.adventurer.health = this.persistence.adventurer.maxHealth;

    const currentLocationData = {
      areaKey: this.persistence.location.areaKey,
      markerName: this.persistence.location.markerName,
    }
    this.scene.start(SCENE_KEYS.exploration, currentLocationData);
  }
}
