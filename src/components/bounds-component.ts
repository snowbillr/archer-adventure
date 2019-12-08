export class BoundsComponent implements Phecs.Component {
  public boundsFrames: Systems.HasBounds.Frame[];

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.boundsFrames = scene.cache.json.get(data.boundsKey);
  }

  destroy() {
    delete this.boundsFrames;
  }
}
