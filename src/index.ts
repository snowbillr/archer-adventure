import 'phaser';

import { SimpleScene } from './scenes/simple-scene';

const gameConfig = {
  width: 500,
  height: 500,
  scene: SimpleScene
};

new Phaser.Game(gameConfig);
