import 'phaser';

import { MovementTestScene } from './scenes/movement-test-scene';
import { AnimTestScene } from './scenes/anim-test-scene';
import { HitboxTestScene } from './scenes/hitbox-test-scene';

const gameConfig = {
  width: 800,
  height: 450,
  // scene: MovementTestScene,
  // scene: AnimTestScene,
  scene: HitboxTestScene,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      gravity: {
        y: 1100,
      }
    }
  }
};

new Phaser.Game(gameConfig);
