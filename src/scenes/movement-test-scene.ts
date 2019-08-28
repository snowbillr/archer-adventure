import 'phaser';

import { Adventurer } from '../entities/adventurer/index';
import { Sign } from '../entities/sign';
import { TagSystem } from '../lib/tag-system';

export class MovementTestScene extends Phaser.Scene {
  private adventurer: Adventurer;
  private tagSystem: TagSystem;

  constructor(config: any) {
    super(config);

    this.adventurer = new Adventurer();
    this.tagSystem = new TagSystem();
  }

  preload() {
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('adventurer-bow', '/assets/sprites/adventurer/adventurer-bow.png', { frameWidth: 50, frameHeight: 37 })

    this.load.animation('adventurer-animations', '/assets/animations/adventurer.json');
    this.load.json('adventurer-hitboxes', '/assets/hitboxes/adventurer.json');
    this.load.json('adventurer-bounds', '/assets/bounds/adventurer.json');

    this.load.spritesheet('fantasy-platformer-core-spritesheet', '/assets/tilesets/fantasy-platformer-core.png', { frameWidth: 16, frameHeight: 16 });

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
    const testSign = signs.objects[0];
    const sign = new Sign();
    sign.create(this, testSign.x * TILEMAP_SCALE, testSign.y * TILEMAP_SCALE - map.tileHeight, 'fantasy-platformer-core-spritesheet', 1128);
    // const sprite = this.add.sprite(testSign.x * TILEMAP_SCALE, testSign.y * TILEMAP_SCALE - map.tileHeight, 'fantasy-platformer-core-spritesheet', 1128);
    console.log(sign);

    this.tagSystem.add('sign-interactor', this.adventurer);
    this.tagSystem.add('sign-interactive', sign);
    this.tagSystem.addSystem(function() {
      const interactors = this.get('sign-interactor') as Interactable.Entity[];
      const interactives = this.get('sign-interactive') as Interactable.Entity[];

      interactors.forEach(interactor => {
        interactives.forEach(interactive => {
          const circle1 = interactor.interactionCircle;
          const circle2 = interactive.interactionCircle;

          if (Phaser.Geom.Intersects.CircleToCircle(circle1, circle2)) {
            console.log('boom')
          }
        })
      });
    });

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
    this.tagSystem.update();
  }
}
