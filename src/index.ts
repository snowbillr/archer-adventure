import 'phaser';

import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';

import { AreaManagerPlugin } from './plugins/area-manager-plugin';
import { PhecsPlugin } from './plugins/phecs-plugin';
import { StateRegistrarPlugin } from './plugins/state-registrar-plugin';
import { ParallaxSpritePlugin } from './plugins/parallax-sprite-plugin';

import { ExplorationScene } from './scenes/exploration-scene';
import { DeathScene } from './scenes/death-scene';
import { PrefabTestScene } from './scenes/prefab-test-scene';
import { PreloadScene } from './scenes/preload-scene';
import { UiScene } from './scenes/ui-scene';

const gameConfig = {
  width: 800,
  height: 450,
  plugins: {
    global: [
      { key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true },
      { key: 'ParallaxSpritePlugin', plugin: ParallaxSpritePlugin, start: true },
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
  scene: [PreloadScene, ExplorationScene, UiScene, DeathScene, PrefabTestScene],
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
