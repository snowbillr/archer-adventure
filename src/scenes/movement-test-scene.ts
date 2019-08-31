import 'phaser';

import { SystemsManager } from '../lib/systems-manager';
import { SignSystem } from '../systems/sign-system';
import { HasSpriteSystem } from '../systems/has-sprite-system';
import { HasPhysicalSpriteSystem } from '../systems/has-physical-sprite-system';
import { HasInteracionCircleSystem } from '../systems/has-interaction-circle-system';
import { HasIndicatorSystem } from '../systems/has-indicator-system';
import { HasBoundsSystem } from '../systems/has-bounds-system';
import { HasControlsSystem } from '../systems/has-controls-system';
import { HasHurtboxesSystem } from '../systems/has-hurtboxes-system';
import { HasPhiniteStateMachineSystem } from '../systems/has-phinite-state-machine-system';

import { movementAttributes } from '../entities/adventurer/movement-attributes';
import { states } from '../entities/adventurer/states';

export class MovementTestScene extends Phaser.Scene {
  private tagManager: SystemsManager;

  constructor(config: any) {
    super(config);

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
    const foregroundLayer = map.createStaticLayer('foreground', tileset, 0, 0);

    const signs = map.getObjectLayer('signs');
    const testSign = signs.objects[0] as { x: number, y: number };
    const signEntity: Entities.Sign = {} as Entities.Sign;

    const adventurer: Entities.Adventurer = {} as Entities.Adventurer;

    this.tagManager.registerSystem(new SignSystem(), [SignSystem.SystemTags.interactor, SignSystem.SystemTags.sign]);
    this.tagManager.registerSystem(new HasSpriteSystem(this), HasSpriteSystem.SystemTags.hasSprite);
    this.tagManager.registerSystem(new HasPhysicalSpriteSystem(this), HasPhysicalSpriteSystem.SystemTags.hasPhysicalSprite);
    this.tagManager.registerSystem(new HasInteracionCircleSystem(this), HasInteracionCircleSystem.SystemTags.hasInteractionCircle);
    this.tagManager.registerSystem(new HasIndicatorSystem(this), HasIndicatorSystem.SystemTags.hasIndicator);
    this.tagManager.registerSystem(new HasBoundsSystem(this), HasBoundsSystem.SystemTags.hasBounds);
    this.tagManager.registerSystem(new HasControlsSystem(this), HasControlsSystem.SystemTags.hasControls);
    this.tagManager.registerSystem(new HasHurtboxesSystem(this), HasHurtboxesSystem.SystemTags.hasHurtboxes);
    this.tagManager.registerSystem(new HasPhiniteStateMachineSystem(this), HasPhiniteStateMachineSystem.SystemTags.hasPhiniteStateMachineSystem);

    this.tagManager.registerEntity(signEntity, HasSpriteSystem.SystemTags.hasSprite, {
      x: testSign.x * TILEMAP_SCALE,
      y: testSign.y * TILEMAP_SCALE - map.tileHeight,
      texture: 'fantasy-platformer-core-spritesheet',
      frame: 1128,
      scale: TILEMAP_SCALE,
    });

    this.tagManager.registerEntity(adventurer, HasPhysicalSpriteSystem.SystemTags.hasPhysicalSprite, {
      x: 900,
      y: 100,
      texture: 'adventurer-core',
      frame: 0,
      scale: TILEMAP_SCALE,
      maxVelocity: {
        x: movementAttributes.maxVelocity
      }
    });

    this.tagManager.registerEntity(adventurer, HasHurtboxesSystem.SystemTags.hasHurtboxes, {
      animationsKey: 'adventurer-hitboxes',
      debug: false,
    });

    this.tagManager.registerEntity(adventurer, HasBoundsSystem.SystemTags.hasBounds, {
      boundsKey: 'adventurer-bounds'
    });

    this.tagManager.registerEntity(adventurer, HasControlsSystem.SystemTags.hasControls);

    this.tagManager.registerEntity(adventurer, HasPhiniteStateMachineSystem.SystemTags.hasPhiniteStateMachineSystem, {
      states: states,
      initialState: states.find(s => s.id === 'adventurer-stand'),
    });

    this.tagManager.registerEntity(signEntity, HasInteracionCircleSystem.SystemTags.hasInteractionCircle, { x: signEntity.sprite.x , y: signEntity.sprite.y, radius: 30 });
    this.tagManager.registerEntity(adventurer, HasInteracionCircleSystem.SystemTags.hasInteractionCircle, { x: adventurer.sprite.x, y: adventurer.sprite.y, radius: 30 });

    this.tagManager.registerEntity(adventurer, SignSystem.SystemTags.interactor);
    this.tagManager.registerEntity(signEntity, SignSystem.SystemTags.sign);

    this.tagManager.registerEntity(signEntity, HasIndicatorSystem.SystemTags.hasIndicator, { depth: signEntity.sprite.depth, targetX: signEntity.sprite.x, targetY: signEntity.sprite.y - signEntity.sprite.displayHeight - 5 });

    groundLayer.setScale(TILEMAP_SCALE);
    backgroundBaseLayer.setScale(TILEMAP_SCALE);
    backgroundDetailsLayer.setScale(TILEMAP_SCALE);
    foregroundLayer.setScale(TILEMAP_SCALE);

    groundLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(adventurer.sprite, groundLayer);

    this.cameras.main.setBounds(0, 0, map.width * tileset.tileWidth * 2, map.height * tileset.tileHeight * 2);
    this.cameras.main.startFollow(adventurer.sprite, true);
  }

  update() {
    this.tagManager.update();
  }
}
