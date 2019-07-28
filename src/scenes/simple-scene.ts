import 'phaser';

import { Adventurer } from '../entities/adventurer';

export class SimpleScene extends Phaser.Scene {
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

    const platform = this.add.rectangle(400, 400, 800, 50, 0x00aa00);
    this.physics.add.existing(platform);
    const platformBody = platform.body as Phaser.Physics.Arcade.Body;
    platformBody.immovable = true;
    platformBody.allowGravity = false;

    this.physics.add.collider(this.adventurer.sprite, platform);
  }
}
