import 'phaser';

import { BaseSystem } from '../lib/base-system';

export class HasControlsSystem<T extends Systems.HasControls> extends BaseSystem<T> implements Systems.System {
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
    }) as Systems.HasControlsControls;

    entity.controls = controls;
  }
}
