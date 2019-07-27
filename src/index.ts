import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
import { AnimTestScene } from './scenes/anim-test-scene';

const gameConfig = {
  width: 800,
  height: 450,
  scene: SimpleScene,
  // scene: AnimTestScene,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      gravity: {
        y: 0,
      }
    }
  }
};

new Phaser.Game(gameConfig);
