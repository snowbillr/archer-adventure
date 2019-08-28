import 'phaser';

import { Adventurer } from '../entities/adventurer/index';
import { TagManager } from '../lib/tag-manager';
import { SignSystem } from '../lib/sign-system';
import { RenderableSystem } from '../lib/renderable-system';
import { InteractableSystem } from '../lib/interactable-system';
import { HasIndicatorSystem } from '../lib/has-indicator-system';

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
    const signEntity: Systems.Interactable & Systems.Renderable = {};

    this.tagManager.registerSystem([SignSystem.SystemTags.interactor, SignSystem.SystemTags.sign], new SignSystem());
    this.tagManager.registerSystem(RenderableSystem.SystemTags.renderable, new RenderableSystem(this));
    this.tagManager.registerSystem(InteractableSystem.SystemTags.interactable, new InteractableSystem(this));
    this.tagManager.registerSystem(HasIndicatorSystem.SystemTags.hasIndicator, new HasIndicatorSystem(this));


    this.tagManager.registerEntity(RenderableSystem.SystemTags.renderable, signEntity, {
      x: testSign.x * TILEMAP_SCALE,
      y: testSign.y * TILEMAP_SCALE - map.tileHeight,
      texture: 'fantasy-platformer-core-spritesheet',
      frame: 1128,
      scale: TILEMAP_SCALE,
    });

    this.tagManager.registerEntity(InteractableSystem.SystemTags.interactable, signEntity, { x: signEntity.sprite!.x , y: signEntity.sprite!.y, radius: 30 });
    this.tagManager.registerEntity(InteractableSystem.SystemTags.interactable, this.adventurer, { x: this.adventurer.sprite.x, y: this.adventurer.sprite.y, radius: 30 });

    this.tagManager.registerEntity(SignSystem.SystemTags.interactor, this.adventurer);
    this.tagManager.registerEntity(SignSystem.SystemTags.sign, signEntity);

    this.tagManager.registerEntity(HasIndicatorSystem.SystemTags.hasIndicator, signEntity, { targetX: signEntity.sprite!.x, targetY: signEntity.sprite!.y - signEntity.sprite!.displayHeight - 5 });

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
