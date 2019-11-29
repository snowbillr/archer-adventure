export class DoorComponent implements Phecs.Component {
  public static tag: string = 'door';

  public toAreaKey: string;
  public toMarker: string;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.toAreaKey = data.toAreaKey;
    this.toMarker = data.toMarker;
  }

  destroy() {
    delete this.toAreaKey;
    delete this.toMarker;
  }
}
