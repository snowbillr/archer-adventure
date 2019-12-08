// This is a temporary component until PhiniteStateMachine states have access to the scene

export class SceneComponent implements Phecs.Component {
  public scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  destroy() {
    delete this.scene;
  }
}