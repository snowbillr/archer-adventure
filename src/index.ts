import 'phaser';

import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';

import { AreaManagerPlugin } from './plugins/area-manager-plugin';
import { EntityManagerPlugin } from './plugins/entity-manager-plugin';
import { StateRegistrarPlugin } from './plugins/state-registrar-plugin';
import { SystemsManagerPlugin } from './plugins/systems-manager-plugin';

import { PreloadScene } from './scenes/preload-scene';
import { MovementTestScene } from './scenes/movement-test-scene';
import { AnimTestScene } from './scenes/anim-test-scene';
import { BoundsTestScene } from './scenes/bounds-test-scene';
import { HitboxTestScene } from './scenes/hitbox-test-scene';

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
        key: 'SystemsManager',
        plugin: SystemsManagerPlugin,
        mapping: 'systemsManager',
      },
      {
        key: 'AreaManager',
        plugin: AreaManagerPlugin,
        mapping: 'areaManager',
      },
      {
        key: 'EntityManager',
        plugin: EntityManagerPlugin,
        mapping: 'entityManager',
      },
    ]
  },
  scene: [PreloadScene, MovementTestScene, BoundsTestScene, HitboxTestScene],
  // scene: AnimTestScene,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      // timeScale: 4,
      gravity: {
        y: 1100,
      }
    }
  }
};

new Phaser.Game(gameConfig);
