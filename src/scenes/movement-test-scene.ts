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
  }

  create() {
    this.adventurer.create(this);

    const platforms = [
      this.createPlatform(100, 200, 200, 50),
      this.createPlatform(400, 400, 100, 50),
      this.createPlatform(600, 400, 100, 50),
    ];

    this.physics.add.collider(this.adventurer.sprite, platforms);
  }

  private createPlatform(x: number, y: number, width: number, height: number) {
    const platform = this.add.rectangle(x, y, width, height, 0x00aa00);
    this.physics.add.existing(platform);
    const platformBody = platform.body as Phaser.Physics.Arcade.Body;
    platformBody.immovable = true;
    platformBody.allowGravity = false;

    return platform;
  }
}
