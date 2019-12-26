export class NpcComponent implements Phecs.Component {
  public npcId: string;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.npcId = data.npcId;
  }

  destroy() {
    delete this.npcId;
  }
}
