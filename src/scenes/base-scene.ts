import 'phaser';

import { SystemsManagerPlugin } from '../plugins/systems-manager-plugin';
import { StateRegistrarPlugin } from '../plugins/state-registrar-plugin';
import { AreaManagerPlugin } from '../plugins/area-manager-plugin';

export abstract class BaseScene extends Phaser.Scene {
  systemsManager!: SystemsManagerPlugin;
  stateRegistrar!: StateRegistrarPlugin;
  areaManager!: AreaManagerPlugin;

  loadNewArea(key: string, markerName?: string) {
    this.systemsManager.stop();
    this.systemsManager.destroyEntities();

    this.areaManager.unload();
    this.areaManager.load(key);
    this.systemsManager.start();

    const adventurer: Entities.Adventurer = this.areaManager.adventurer;
    if (markerName) {
      const marker = this.areaManager.markers[markerName];
      adventurer.sprite.setPosition(marker!.x, marker!.y - adventurer.sprite.displayHeight / 2);
    }

    const map = this.areaManager.map;
    const tileset = this.areaManager.tileset;
    this.cameras.main.setBackgroundColor(0xCCCCCC);
    this.cameras.main.setBounds(0, 0, map.width * tileset.tileWidth * 2, map.height * tileset.tileHeight * 2);
    this.cameras.main.startFollow(adventurer.sprite, true);
  }
}
