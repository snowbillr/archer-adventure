import { BaseScene } from "./base-scene";

import { SCENE_KEYS } from "../constants/scene-keys";
import { PERSISTENCE_KEYS } from "../constants/persistence-keys";

export class NewGameScene extends BaseScene {
  constructor() {
    super({ key: SCENE_KEYS.newGame });
  }

  create() {
    this.persistence.set(PERSISTENCE_KEYS.adventurer.health, 5);

    this.scene.start(SCENE_KEYS.exploration, { areaKey: 'woollards-farm' });
  }
}
