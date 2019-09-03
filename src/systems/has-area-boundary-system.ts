import 'phaser';

export class HasAreaBoundarySystem implements SystemsManager.System {
  static SystemTags = {
    hasAreaBoundary: 'hasAreaBoundary',
  };

  registerEntity(entity: Systems.HasAreaBoundary.Entity, data: SystemsManager.EntityRegistrationData): void {
    entity.areaBoundary = {
      left: data.areaBoundaryLeft,
      right: data.areaBoundaryRight
    };
  }

  destroy(entity: Systems.HasAreaBoundary.Entity) {
    delete entity.areaBoundary;
  }
}
