export class DeathScene extends Phaser.Scene {
  constructor() {
    super({ key: 'death' });
  }

  create(data: any) {
    const titleText = this.add.bitmapText(this.cameras.main.centerX, this.cameras.main.centerY - 24, 'compass-72', 'You died');
    titleText.setOrigin(0.5);

    const promptText = this.add.bitmapText(this.cameras.main.centerX, this.cameras.main.centerY + 32, 'compass-24', 'Try again?');
    promptText.setOrigin(0.5);

    this.input.keyboard.once(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, () => {
      this.scene.stop('exploration');
      this.scene.stop('ui');
      this.scene.stop('death');
      this.scene.start('exploration', { areaKey: data.areaKey });
    });
  }
}