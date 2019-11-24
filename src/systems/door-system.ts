import { ExplorationScene } from '../scenes/exploration-scene';

export class DoorSystem implements SystemsManager.System {
  static SystemTags = {
    door: 'door',
    doorInteractor: 'doorInteractor',
  };

  private scene: ExplorationScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as ExplorationScene;
  }

  registerEntity(entity: (Systems.DoorSystem.DoorEntity | Systems.DoorSystem.DoorInteractorEntity), data: SystemsManager.EntityRegistrationData, tag: string) {
    if (tag === DoorSystem.SystemTags.door) {
      const doorEntity = entity as Systems.DoorSystem.DoorEntity;
      doorEntity.toKey = data.toKey;
      doorEntity.toMarker = data.toMarker;
    }
  }

  update(systemsManager: SystemsManager.SystemsManager) {
    // there is only one interactor, the adventurer
    const doorInteractor: Systems.DoorSystem.DoorInteractorEntity = systemsManager.getEntities<Systems.DoorSystem.DoorInteractorEntity>(DoorSystem.SystemTags.doorInteractor)[0];
    const doors: Systems.DoorSystem.DoorEntity[] = systemsManager.getEntities(DoorSystem.SystemTags.door);

    const enteringDoorIds = doorInteractor.interactionTracker.getEntityIds('entering');
    const enteringDoors = doors.filter(door => enteringDoorIds.includes(door.id));
    for (let enteringDoor of enteringDoors) {
      enteringDoor.showIndicator();
    }

    const exitingDoorIds = doorInteractor.interactionTracker.getEntityIds('exiting');
    const exitingDoors = doors.filter(door => exitingDoorIds.includes(door.id));
    for (let enteringDoor of exitingDoors) {
      enteringDoor.hideIndicator();
    }

    const activeDoorIds = doorInteractor.interactionTracker.getEntityIds('active');
    const activeDoors = doors.filter(door => activeDoorIds.includes(door.id));
    for (let door of activeDoors) {
      const interactionControlKey = doorInteractor.controls[door.interactionControl!];
      if (interactionControlKey && interactionControlKey.isDown) {
        this.scene.loadNewArea(door.toKey, door.toMarker);
      }
    }
  }

  destroy(entity: (Systems.DoorSystem.DoorEntity | Systems.DoorSystem.DoorInteractorEntity), tag: string) {
    if (tag === DoorSystem.SystemTags.door) {
      const doorEntity = entity as Systems.DoorSystem.DoorEntity;
      delete doorEntity.toKey;
    }
  }
}
