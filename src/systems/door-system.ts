import { BaseScene } from '../scenes/base-scene';

export class DoorSystem implements SystemsManager.System {
  static SystemTags = {
    door: 'door',
    doorInteractor: 'doorInteractor',
  };

  private scene: BaseScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
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
        if (door.activeInteractionIds.includes(doorInteractor.id)) {
          this.scene.loadNewArea(door.toKey, door.toMarker);
        }
      });
    });
  }

  update(systemsManager: SystemsManager.SystemsManager) {
    const doorInteractors: Systems.DoorSystem.DoorInteractorEntity[] = systemsManager.getEntities(DoorSystem.SystemTags.doorInteractor);
    const doors: Systems.DoorSystem.DoorEntity[] = systemsManager.getEntities(DoorSystem.SystemTags.door);

    doorInteractors.forEach(doorInteractor => {
      const activeDoorIds = doorInteractor.activeInteractionIds;
      const activeDoors = doors.filter(door => activeDoorIds.includes(door.id));
      const inactiveDoors = doors.filter(door => !activeDoorIds.includes(door.id));

      activeDoors.forEach(activeDoor => {
        activeDoor!.showIndicator()
      });
      inactiveDoors.forEach(inactiveDoor => inactiveDoor!.hideIndicator());
    });
  }

  destroy(entity: (Systems.DoorSystem.DoorEntity | Systems.DoorSystem.DoorInteractorEntity), tag: string) {
    if (tag === DoorSystem.SystemTags.door) {
      const doorEntity = entity as Systems.DoorSystem.DoorEntity;
      delete doorEntity.toKey;
    }
  }
}
