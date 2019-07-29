import 'phaser';

import { Adventurer } from '../entities/adventurer/index';

export class MovementTestScene extends Phaser.Scene {
  private adventurer: Adventurer;

  constructor(config: any) {
    super(config);

    this.adventurer = new Adventurer();
  }

  preload() {
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('adventurer-bow', '/assets/sprites/adventurer/adventurer-bow.png', { frameWidth: 50, frameHeight: 37 })

    this.load.animation('adventurer-animations', '/assets/animations/adventurer.json');

    this.load.image('magic-cliffs', '/assets/tilesets/magic-cliffs.png');
    this.load.tilemapTiledJSON('test', '/assets/tilemaps/test.json')
  }

  create() {
    const map = this.make.tilemap({ key: 'test' });
    const tileset = map.addTilesetImage('magic-cliffs', 'magic-cliffs');

    const backgroundLayer = map.createStaticLayer('background', tileset, 0, 0);
    const platformsLayer = map.createStaticLayer('platforms', tileset, 0, 0);
    this.adventurer.create(this);
    const foregroundLayer = map.createStaticLayer('foreground', tileset, 0, 0);

    backgroundLayer.setScale(2);
    platformsLayer.setScale(2);
    foregroundLayer.setScale(2);

    platformsLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.adventurer.sprite, platformsLayer);

    this.cameras.main.setBounds(0, 0, 50 * tileset.tileWidth * 2, 16 * tileset.tileHeight * 2);
    this.cameras.main.startFollow(this.adventurer.sprite, true);
  }
}
