import 'phaser';

import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';

import { AreaManagerPlugin } from './plugins/area-manager-plugin';
import { PhecsPlugin } from './plugins/phecs-plugin';
import { StateRegistrarPlugin } from './plugins/state-registrar-plugin';

import { PreloadScene } from './scenes/preload-scene';
import { ExplorationScene } from './scenes/exploration-scene';
import { UiScene } from './scenes/ui-scene';
import { PrefabTestScene } from './scenes/prefab-test-scene';

const gameConfig = {
  width: 800,
  height: 450,
  plugins: {
    global: [
      { key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true },
    ],
    scene: [
      {
        key: 'StateRegistrar',
        plugin: StateRegistrarPlugin,
        mapping: 'stateRegistrar',
      },
      {
        key: 'Phecs',
        plugin: PhecsPlugin,
        mapping: 'phecs',
      },
      {
        key: 'AreaManager',
        plugin: AreaManagerPlugin,
        mapping: 'areaManager',
      },
    ]
  },
  scene: [PreloadScene, ExplorationScene, UiScene, PrefabTestScene],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      // timeScale: 4,
      gravity: {
        y: 1100,
      }
    }
  }
};

new Phaser.Game(gameConfig);
