import 'phaser';

import { BaseSystem } from '../lib/systems/base-system';

export class HasControlsSystem<T extends Systems.HasControls.Entity> extends BaseSystem<T> implements SystemsManager.System {
  static SystemTags = {
    hasControls: 'hasControls',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasControlsSystem.SystemTags.hasControls, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: { [key: string]: any }): void {
    const controls = this.scene.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
    }) as Systems.HasControls.Controls;

    entity.controls = controls;
  }
}
