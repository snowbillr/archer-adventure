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
    this.load.json('adventurer-hitboxes', '/assets/hitboxes/adventurer.json');
    this.load.json('adventurer-bounds', '/assets/bounds/adventurer.json');

    this.load.image('fantasy-platformer-core', '/assets/tilesets/fantasy-platformer-core.png');
    this.load.tilemapTiledJSON('starting-area', '/assets/tilemaps/starting-area.json')
  }

  create() {
    const map = this.make.tilemap({ key: 'starting-area' });
    const tileset = map.addTilesetImage('fantasy-platformer-core', 'fantasy-platformer-core');

    const groundLayer = map.createStaticLayer('ground', tileset, 0, 0);
    const backgroundBaseLayer = map.createStaticLayer('background-base', tileset, 0, 0);
    const backgroundDetailsLayer = map.createStaticLayer('background-details', tileset, 0, 0);
    this.adventurer.create(this);
    const foregroundLayer = map.createStaticLayer('foreground', tileset, 0, 0);

    groundLayer.setScale(2);
    backgroundBaseLayer.setScale(2);
    backgroundDetailsLayer.setScale(2);
    foregroundLayer.setScale(2);

    groundLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.adventurer.sprite, groundLayer);

    this.cameras.main.setBounds(0, 0, map.width * tileset.tileWidth * 2, map.height * tileset.tileHeight * 2);
    this.cameras.main.startFollow(this.adventurer.sprite, true);
  }
}
