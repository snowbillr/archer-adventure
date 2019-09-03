import 'phaser';

import { SystemsManagerPlugin } from '../plugins/systems-manager-plugin';
import { StateRegistrarPlugin } from '../plugins/state-registrar-plugin';
import { AreaManager } from '../lib/area-manager/area-manager';

export abstract class BaseScene extends Phaser.Scene {
  systemsManager!: SystemsManagerPlugin;
  stateRegistrar!: StateRegistrarPlugin;
  areaManager!: AreaManager;

  loadNewArea(tilemapKey: string, tilesetName: string, tilesetKey: string, scale: number) {
    this.systemsManager.destroy();
    this.scene.restart({
      tilemapKey,
      tilesetName,
      tilesetKey,
      scale
    });
  }
}
