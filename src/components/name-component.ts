export class NameComponent implements Phecs.Component {
  public name: string;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.name = data.name;
  }

  destroy() {
    delete this.name;
  }
}