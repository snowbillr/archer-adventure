import 'phaser';

import { SystemsManagerPlugin } from './plugins/systems-manager-plugin';
import { StateRegistrarPlugin } from './plugins/state-registrar-plugin';

import { PreloadScene } from './scenes/preload-scene';
import { MovementTestScene } from './scenes/movement-test-scene';
import { AnimTestScene } from './scenes/anim-test-scene';
import { BoundsTestScene } from './scenes/bounds-test-scene';
import { HitboxTestScene } from './scenes/hitbox-test-scene';

const gameConfig = {
  width: 800,
  height: 450,
  plugins: {
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
      }
    ]
  },
  // scene: BoundsTestScene,
  scene: [PreloadScene, MovementTestScene],
  // scene: AnimTestScene,
  // scene: HitboxTestScene,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      // timeScale: 4,
      gravity: {
        y: 1100,
      }
    }
  }
};

new Phaser.Game(gameConfig);
