import 'phaser';

import { BaseSystem } from '../lib/systems/base-system';

export class HasAreaBoundarySystem<T extends Systems.HasAreaBoundary.Entity> extends BaseSystem<T> implements SystemsManager.System {
  static SystemTags = {
    hasAreaBoundary: 'hasAreaBoundary',
  };

  constructor() {
    super(HasAreaBoundarySystem.SystemTags.hasAreaBoundary, '');
  }

  registerEntity(entity: T, data: { [key: string]: any }): void {
    entity.areaBoundary = {
      left: data.left,
      right: data.right
    };
  }
}
