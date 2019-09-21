import 'phaser';

export class HasControlsSystem implements SystemsManager.System {
  static SystemTags = {
    hasControls: 'hasControls',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.HasControls.Entity): void {
    const controls = this.scene.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
      'action': Phaser.Input.Keyboard.KeyCodes.SPACE,
      'attack': Phaser.Input.Keyboard.KeyCodes.SPACE,
    }) as Systems.HasControls.Controls;

    const codes = {
      'up': 'ArrowUp',
      'down': 'ArrowDown',
      'left': 'ArrowLeft',
      'right': 'ArrowRight',
      'action': ' ',
      'attack': ' ',
    }

    entity.controls = controls;
    entity.codes = codes;
  }

  stop(systemsManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasControls.Entity[] = systemsManager.getEntities(HasControlsSystem.SystemTags.hasControls);

    entities.forEach(entity => {
      Object.values(entity.controls).forEach(key => {
        key.removeAllListeners();
      });
    });
  }

  destroy(entity: Systems.HasControls.Entity) {
    delete entity.controls;
  }
}
