import 'phaser';

export class AnimTestScene extends Phaser.Scene {
  private sprite!: Phaser.GameObjects.Sprite;

  preload() {
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('adventurer-bow', '/assets/sprites/adventurer/adventurer-bow.png', { frameWidth: 50, frameHeight: 37 })
  }

  create() {
    // const cycle = [4, 5, 6, 7];
    const cycle = Array.from({ length: 111 }, (v, i) => i);
    let cycleIndex = 0;

    this.sprite = this.add.sprite(200, 200, 'adventurer-core', cycle[cycleIndex]);
    this.sprite.setScale(2);

    const frameText = this.add.text(200, 150, `${cycle[cycleIndex]}`);


    this.input.keyboard.on('keydown', (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          cycleIndex++;
          break;
        case "ArrowDown":
          cycleIndex--;
          break;
      }

      if (cycleIndex === cycle.length) {
        cycleIndex = 0;
      } else if (cycleIndex === -1) {
        cycleIndex = cycle.length - 1;
      }

      this.sprite.setFrame(cycle[cycleIndex]);
      frameText.setText(`${cycle[cycleIndex]}`);
    });
  }
}
