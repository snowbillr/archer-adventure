type MenuActionCallback = () => void;

export class MenuActionComponent implements Phecs.Component {
  public callback: MenuActionCallback;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.callback = data.menuActionCallback;
  }

  destroy() {
    delete this.callback;
  }
}
