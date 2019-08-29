import 'phaser';

import { Adventurer } from '../entities/adventurer/index';
import { SystemsManager } from '../lib/systems-manager';
import { SignSystem } from '../systems/sign-system';
import { HasSpriteSystem } from '../systems/has-sprite-system';
import { HasPhysicalSpriteSystem } from '../systems/has-physical-sprite-system';
import { HasInteracionCircleSystem } from '../systems/has-interaction-circle-system';
import { HasIndicatorSystem } from '../systems/has-indicator-system';
import { HasBoundsSystem } from '../systems/has-bounds-system';
import { HasControlsSystem } from '../systems/has-controls-system';
import { HasHurtboxesSystem } from '../systems/has-hurtboxes-system';

import { movementAttributes } from '../entities/adventurer/movement-attributes';

export class MovementTestScene extends Phaser.Scene {
  private adventurer: Adventurer;
  private tagManager: SystemsManager;

  constructor(config: any) {
    super(config);

    this.adventurer = new Adventurer();
    this.tagManager = new SystemsManager();
  }

  preload() {
    // adventurer
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('adventurer-bow', '/assets/sprites/adventurer/adventurer-bow.png', { frameWidth: 50, frameHeight: 37 })

    this.load.animation('adventurer-animations', '/assets/animations/adventurer.json');
    this.load.json('adventurer-hitboxes', '/assets/hurtboxes/adventurer.json');
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
    const signEntity: Systems.HasInteractionCircle.Entity & Systems.HasSprite.Entity = {};

    this.tagManager.registerSystem(new SignSystem(), [SignSystem.SystemTags.interactor, SignSystem.SystemTags.sign]);
    this.tagManager.registerSystem(new HasSpriteSystem(this), HasSpriteSystem.SystemTags.hasSprite);
    this.tagManager.registerSystem(new HasPhysicalSpriteSystem(this), HasPhysicalSpriteSystem.SystemTags.hasPhysicalSprite);
    this.tagManager.registerSystem(new HasInteracionCircleSystem(this), HasInteracionCircleSystem.SystemTags.hasInteractionCircle);
    this.tagManager.registerSystem(new HasIndicatorSystem(this), HasIndicatorSystem.SystemTags.hasIndicator);
    this.tagManager.registerSystem(new HasBoundsSystem(this), HasBoundsSystem.SystemTags.hasBounds);
    this.tagManager.registerSystem(new HasControlsSystem(this), HasControlsSystem.SystemTags.hasControls);
    this.tagManager.registerSystem(new HasHurtboxesSystem(this), HasHurtboxesSystem.SystemTags.hasHurtboxes);

    this.tagManager.registerEntity(signEntity, HasSpriteSystem.SystemTags.hasSprite, {
      x: testSign.x * TILEMAP_SCALE,
      y: testSign.y * TILEMAP_SCALE - map.tileHeight,
      texture: 'fantasy-platformer-core-spritesheet',
      frame: 1128,
      scale: TILEMAP_SCALE,
    });

    this.tagManager.registerEntity(this.adventurer, HasPhysicalSpriteSystem.SystemTags.hasPhysicalSprite, {
      x: 900,
      y: 100,
      texture: 'adventurer-core',
      frame: 0,
      scale: TILEMAP_SCALE,
      maxVelocity: {
        x: movementAttributes.maxVelocity
      }
    });

    this.tagManager.registerEntity(this.adventurer, HasHurtboxesSystem.SystemTags.hasHurtboxes, {
      animationsKey: 'adventurer-hitboxes',
      debug: true,
    });

    this.tagManager.registerEntity(this.adventurer, HasBoundsSystem.SystemTags.hasBounds, {
      boundsKey: 'adventurer-bounds'
    });

    this.tagManager.registerEntity(this.adventurer, HasControlsSystem.SystemTags.hasControls);

    this.tagManager.registerEntity(signEntity, HasInteracionCircleSystem.SystemTags.hasInteractionCircle, { x: signEntity.sprite!.x , y: signEntity.sprite!.y, radius: 30 });
    this.tagManager.registerEntity(this.adventurer, HasInteracionCircleSystem.SystemTags.hasInteractionCircle, { x: this.adventurer.sprite.x, y: this.adventurer.sprite.y, radius: 30 });

    this.tagManager.registerEntity(this.adventurer, SignSystem.SystemTags.interactor);
    this.tagManager.registerEntity(signEntity, SignSystem.SystemTags.sign);

    this.tagManager.registerEntity(signEntity, HasIndicatorSystem.SystemTags.hasIndicator, { targetX: signEntity.sprite!.x, targetY: signEntity.sprite!.y - signEntity.sprite!.displayHeight - 5 });

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
