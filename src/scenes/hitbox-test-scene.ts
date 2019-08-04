import 'phaser';
import { TestAdventurer } from '../entities/test-adventurer';

export class HitboxTestScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.json('adventurer-hitboxes', '/assets/hitboxes/adventurer.json');
  }

  create() {
    let frameIndex = 0;
    const frameText = this.add.text(100, 200, `Frame ${frameIndex}`);

    const testAdventurer = new TestAdventurer();
    testAdventurer.create(this);
    testAdventurer.sprite.x = 100;
    testAdventurer.sprite.y = 100;

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
