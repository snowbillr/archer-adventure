import 'phaser';
import { TestAdventurer } from '../entities/test-adventurer';

export class BoundsTestScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.json('adventurer-bounds', '/assets/bounds/adventurer.json');
  }

  create() {
    let frameIndex = 28;
    const frameText = this.add.text(200, 50, `Frame ${frameIndex}`);

    const testAdventurer = new TestAdventurer();
    testAdventurer.create(this);
    testAdventurer.sprite.x = 150;
    testAdventurer.sprite.y = 200;
    testAdventurer.sprite.setFrame(frameIndex);

    this.input.keyboard.on('keydown', (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          frameIndex++
          break;
        case "ArrowDown":
          frameIndex--;
          break;
      }

      testAdventurer.sprite.setFrame(frameIndex);
      frameText.setText(`Frame ${frameIndex}`);
    });
  }
}
