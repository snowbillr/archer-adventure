import 'phaser';

import { MovementTestScene } from './scenes/movement-test-scene';
import { AnimTestScene } from './scenes/anim-test-scene';
import { BoundsTestScene } from './scenes/bounds-test-scene';
import { HitboxTestScene } from './scenes/hitbox-test-scene';

const gameConfig = {
  width: 800,
  height: 450,
  // scene: BoundsTestScene,
  scene: MovementTestScene,
  // scene: AnimTestScene,
  // scene: HitboxTestScene,
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
