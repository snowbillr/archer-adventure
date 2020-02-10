import 'phaser';

import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';

import { AreaManagerPlugin } from './plugins/area-manager-plugin';
import { ControlsPlugin } from './plugins/controls/controls-plugin';
import { SfxPlugin } from './plugins/sfx-plugin';
import { ParallaxSpritePlugin } from './plugins/parallax-sprite-plugin';
import { PersistencePlugin } from './plugins/persistence-plugin';
import { PhecsPlugin } from './plugins/phecs-plugin';

import { ExplorationScene } from './scenes/exploration-scene';
import { DeathScene } from './scenes/death-scene';
import { PrefabTestScene } from './scenes/prefab-test-scene';
import { PreloadScene } from './scenes/preload-scene';
import { HUDScene } from './scenes/hud-scene';
import { TitleScene } from './scenes/title-scene';
import { NewGameScene } from './scenes/new-game-scene';
import { ContinueGameScene } from './scenes/continue-game-scene';

const gameConfig = {
  width: 800,
  height: 450,
  plugins: {
    global: [
      { key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true },
      { key: 'ParallaxSpritePlugin', plugin: ParallaxSpritePlugin, start: true },
      { key: 'PersistencePlugin', plugin: PersistencePlugin, mapping: 'persistence', start: true },
    ],
    scene: [
      {
        key: 'Phecs',
        plugin: PhecsPlugin,
        mapping: 'phecs',
      },
      {
        key: 'Sfx',
        plugin: SfxPlugin,
        mapping: 'sfx',
      },
      {
        key: 'Controls',
        plugin: ControlsPlugin,
        mapping: 'controls',
      },
      {
        key: 'AreaManager',
        plugin: AreaManagerPlugin,
        mapping: 'areaManager',
      },
    ]
  },
  scene: [
    PreloadScene,

    TitleScene,

    NewGameScene,
    ContinueGameScene,

    ExplorationScene,
    HUDScene,
    DeathScene,

    PrefabTestScene,
  ],
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
