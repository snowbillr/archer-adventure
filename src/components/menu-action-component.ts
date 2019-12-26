type MenuActionCallback = () => void;

export class MenuActionComponent implements Phecs.Component {
  public callback: MenuActionCallback;
  public disabled: boolean;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.callback = data.menuActionCallback;
    this.disabled = data.menuActionDisabled;
  }

  destroy() {
    delete this.callback;
  }
}
