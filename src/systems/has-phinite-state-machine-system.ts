import 'phaser';

import { BaseSystem } from '../lib/base-system';

export class HasPhiniteStateMachineSystem<T extends SystemsManager.Entity> extends BaseSystem<T> implements SystemsManager.System {
  static SystemTags = {
    hasPhiniteStateMachineSystem: 'hasPhiniteStateMachineSystem',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasPhiniteStateMachineSystem.SystemTags.hasPhiniteStateMachineSystem, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: SystemsManager.EntityRegistrationData): void {

  }

  update(tagManager: SystemsManager.SystemsManager) {
    super.update(tagManager);

    const entities = this.tag1s;
    entities.forEach(entity => {

    });
  }
}
