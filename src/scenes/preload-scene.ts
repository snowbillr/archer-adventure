export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload' });
  }

  preload() {
    // fonts
    this.load.bitmapFont('compass-72', '/assets/fonts/compass-72.png', '/assets/fonts/compass-72.xml');
    this.load.bitmapFont('compass-24', '/assets/fonts/compass-24.png', '/assets/fonts/compass-24.xml');
    this.load.bitmapFont('compass-18', '/assets/fonts/compass-18.png', '/assets/fonts/compass-18.xml');

    // adventurer
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('adventurer-bow', '/assets/sprites/adventurer/adventurer-bow.png', { frameWidth: 50, frameHeight: 37 })

    this.load.animation('adventurer-animations', '/assets/animations/adventurer.json');
    this.load.json('adventurer-hurtboxes', '/assets/hurtboxes/adventurer.json');
    this.load.json('adventurer-bounds', '/assets/bounds/adventurer.json');

    // arrow
    this.load.image('arrow', '/assets/sprites/projectiles/arrow.png');
    this.load.json('arrow-bounds', '/assets/bounds/arrow.json');

    // sheep
    this.load.spritesheet('sheep-walk', '/assets/sprites/sheep/sheep-walk.png', { frameWidth: 20, frameHeight: 17 });
    this.load.animation('sheep-animations', '/assets/animations/sheep.json');

    // indicators
    this.load.spritesheet('indicator-down', '/assets/sprites/indicators/indicator-down.png', { frameWidth: 16, frameHeight: 16 })
    this.load.animation('indicator-animations', '/assets/animations/indicators.json');

    // doors
    this.load.spritesheet('doors', '/assets/sprites/doors/doors.png', { frameWidth: 32, frameHeight: 41 })

    // tilemap spritesheet
    this.load.spritesheet('fantasy-platformer-core-spritesheet', '/assets/tilesets/fantasy-platformer-core.png', { frameWidth: 16, frameHeight: 16 });

    // tileset
    this.load.image('fantasy-platformer-core', '/assets/tilesets/fantasy-platformer-core.png');

    // tilemap
    this.load.tilemapTiledJSON('starting-area', '/assets/tilemaps/starting-area.json')
    this.load.tilemapTiledJSON('house', '/assets/tilemaps/house.json')

    // conversations
    this.load.image('textbox', '/assets/sprites/conversations/textbox.png');
    this.load.json('signs', '/assets/signs.json');
  }

  create() {
    // this.scene.start('movementTest', { areaKey: 'starting-area' });
    this.scene.start('boundsTest');
    // this.scene.start('hitboxTest');
  }
}
