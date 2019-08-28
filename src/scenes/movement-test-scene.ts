import 'phaser';

import { Adventurer } from '../entities/adventurer/index';
import { Sign } from '../entities/sign';
import { TagManager } from '../lib/tag-manager';
import { SignSystem } from '../lib/sign-system';

export class MovementTestScene extends Phaser.Scene {
  private adventurer: Adventurer;
  private tagManager: TagManager;

  constructor(config: any) {
    super(config);

    this.adventurer = new Adventurer();
    this.tagManager = new TagManager();
  }

  preload() {
    // adventurer
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('adventurer-bow', '/assets/sprites/adventurer/adventurer-bow.png', { frameWidth: 50, frameHeight: 37 })

    this.load.animation('adventurer-animations', '/assets/animations/adventurer.json');
    this.load.json('adventurer-hitboxes', '/assets/hitboxes/adventurer.json');
    this.load.json('adventurer-bounds', '/assets/bounds/adventurer.json');

    // indicators
    this.load.spritesheet('indicator-down', '/assets/sprites/indicators/indicator-down.png', { frameWidth: 16, frameHeight: 16 })
    this.load.animation('indicator-animations', '/assets/animations/indicators.json');

    // tilemap spritesheet
    this.load.spritesheet('fantasy-platformer-core-spritesheet', '/assets/tilesets/fantasy-platformer-core.png', { frameWidth: 16, frameHeight: 16 });

    // tilemap
    this.load.image('fantasy-platformer-core', '/assets/tilesets/fantasy-platformer-core.png');
    this.load.tilemapTiledJSON('starting-area', '/assets/tilemaps/starting-area.json')
  }

  create() {
    const TILEMAP_SCALE = 2;

    const map = this.make.tilemap({ key: 'starting-area' });
    const tileset = map.addTilesetImage('fantasy-platformer-core', 'fantasy-platformer-core');

    const groundLayer = map.createStaticLayer('ground', tileset, 0, 0);
    const backgroundBaseLayer = map.createStaticLayer('background-base', tileset, 0, 0);
    const backgroundDetailsLayer = map.createStaticLayer('background-details', tileset, 0, 0);
    this.adventurer.create(this);
    const foregroundLayer = map.createStaticLayer('foreground', tileset, 0, 0);

    const signs = map.getObjectLayer('signs');
    const testSign = signs.objects[0] as { x: number, y: number };
    const sign = new Sign();
    sign.create(this, testSign.x * TILEMAP_SCALE, testSign.y * TILEMAP_SCALE - map.tileHeight, 'fantasy-platformer-core-spritesheet', 1128);

    this.tagManager.registerEntity('sign-interactor', this.adventurer);
    this.tagManager.registerEntity('sign-interactive', sign);
    this.tagManager.registerSystem(new SignSystem<Adventurer>('sign-interactor', 'sign-interactive'));

    groundLayer.setScale(TILEMAP_SCALE);
    backgroundBaseLayer.setScale(TILEMAP_SCALE);
    backgroundDetailsLayer.setScale(TILEMAP_SCALE);
    foregroundLayer.setScale(TILEMAP_SCALE);

    groundLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.adventurer.sprite, groundLayer);

    this.cameras.main.setBounds(0, 0, map.width * tileset.tileWidth * 2, map.height * tileset.tileHeight * 2);
    this.cameras.main.startFollow(this.adventurer.sprite, true);
  }

  update() {
    this.tagManager.update();
  }
}
