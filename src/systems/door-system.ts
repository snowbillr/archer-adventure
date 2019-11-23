import { MovementTestScene } from '../scenes/movement-test-scene';

export class DoorSystem implements SystemsManager.System {
  static SystemTags = {
    door: 'door',
    doorInteractor: 'doorInteractor',
  };

  private scene: MovementTestScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as MovementTestScene;
  }

  registerEntity(entity: (Systems.DoorSystem.DoorEntity | Systems.DoorSystem.DoorInteractorEntity), data: SystemsManager.EntityRegistrationData, tag: string) {
    if (tag === DoorSystem.SystemTags.door) {
      const doorEntity = entity as Systems.DoorSystem.DoorEntity;
      doorEntity.toKey = data.toKey;
      doorEntity.toMarker = data.toMarker;
    }
  }

  start(systemsManager: SystemsManager.SystemsManager) {
    const doorInteractors: Systems.DoorSystem.DoorInteractorEntity[] = systemsManager.getEntities(DoorSystem.SystemTags.doorInteractor);
    const doors: Systems.DoorSystem.DoorEntity[] = systemsManager.getEntities(DoorSystem.SystemTags.door);

    const doorInteractor = doorInteractors[0];
    doors.forEach(door => {
      const controlKey = doorInteractor.controls[door.interactionControl!];

      controlKey.on(Phaser.Input.Keyboard.Events.DOWN, () => {
        const activeInteractionIds = door.interactionTracker.getEntityIds('active');
        if (activeInteractionIds.includes(doorInteractor.id)) {
          this.scene.loadNewArea(door.toKey, door.toMarker);
        }
      });
    });
  }

  update(systemsManager: SystemsManager.SystemsManager) {
    const doorInteractors: Systems.DoorSystem.DoorInteractorEntity[] = systemsManager.getEntities(DoorSystem.SystemTags.doorInteractor);
    const doors: Systems.DoorSystem.DoorEntity[] = systemsManager.getEntities(DoorSystem.SystemTags.door);

    for (let doorInteractor of doorInteractors) {
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
    };
  }

  destroy(entity: (Systems.DoorSystem.DoorEntity | Systems.DoorSystem.DoorInteractorEntity), tag: string) {
    if (tag === DoorSystem.SystemTags.door) {
      const doorEntity = entity as Systems.DoorSystem.DoorEntity;
      delete doorEntity.toKey;
    }
  }
}
