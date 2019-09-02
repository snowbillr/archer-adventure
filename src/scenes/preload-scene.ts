export class PreloadScene extends Phaser.Scene {
  preload() {
    // adventurer
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('adventurer-bow', '/assets/sprites/adventurer/adventurer-bow.png', { frameWidth: 50, frameHeight: 37 })

    this.load.animation('adventurer-animations', '/assets/animations/adventurer.json');
    this.load.json('adventurer-hurtboxes', '/assets/hurtboxes/adventurer.json');
    this.load.json('adventurer-bounds', '/assets/bounds/adventurer.json');

    // sheep
    this.load.spritesheet('sheep-walk', '/assets/sprites/sheep/sheep-walk.png', { frameWidth: 20, frameHeight: 17 });
    this.load.animation('sheep-animations', '/assets/animations/sheep.json');

    // indicators
    this.load.spritesheet('indicator-down', '/assets/sprites/indicators/indicator-down.png', { frameWidth: 16, frameHeight: 16 })
    this.load.animation('indicator-animations', '/assets/animations/indicators.json');

    // tilemap spritesheet
    this.load.spritesheet('fantasy-platformer-core-spritesheet', '/assets/tilesets/fantasy-platformer-core.png', { frameWidth: 16, frameHeight: 16 });

    // tileset
    this.load.image('fantasy-platformer-core', '/assets/tilesets/fantasy-platformer-core.png');

    // tilemap
    this.load.tilemapTiledJSON('starting-area', '/assets/tilemaps/starting-area.json')
    this.load.tilemapTiledJSON('house', '/assets/tilemaps/house.json')
  }

  create() {
    const data = {
      tilemapKey: 'starting-area',
      tilesetName: 'fantasy-platformer-core',
      tilesetKey: 'fantasy-platformer-core',
      tileLayers: [
        'ground',
        'background-base',
        'background-details',
        'npc-foreground',
        'foreground'
      ],
      objectLayers: [
        'signs',
        'npcs',
        'adventurer'
      ]
    };

    this.scene.start('movementTest', data);
  }
}
