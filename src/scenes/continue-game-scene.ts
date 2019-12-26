import { BaseScene } from "./base-scene";

import { SCENE_KEYS } from "../constants/scene-keys";
import { PERSISTENCE_KEYS } from "../constants/persistence-keys";

export class ContinueGameScene extends BaseScene {
  constructor() {
    super({ key: SCENE_KEYS.continueGame });
  }

  create() {
    this.persistence.load();

    this.persistence.set(PERSISTENCE_KEYS.adventurer.health, this.persistence.get(PERSISTENCE_KEYS.adventurer.maxHealth));

    const currentLocationData = {
      areaKey: this.persistence.get(PERSISTENCE_KEYS.currentArea),
      markerName: this.persistence.get(PERSISTENCE_KEYS.currentMarker),
    }
    this.scene.start(SCENE_KEYS.exploration, currentLocationData);
  }
}