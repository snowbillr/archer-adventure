export class DeathScene extends Phaser.Scene {
  constructor() {
    super({ key: 'death' });
  }

  create() {
    this.add.text(100, 100, 'ya dead');
  }
}