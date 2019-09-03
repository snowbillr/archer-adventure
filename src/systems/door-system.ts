export class DoorSystem implements SystemsManager.System {
  static SystemTags = {
    door: 'door',
    doorInteractor: 'doorInteractor',
  };

  registerEntity(entity: any, data: SystemsManager.EntityRegistrationData) {

  }

  update(systemsManager: SystemsManager.SystemsManager) {
    const doorInteractors: Systems.DoorSystem.DoorInteractorEntity[] = systemsManager.getEntities(DoorSystem.SystemTags.doorInteractor);
    const doors: Systems.DoorSystem.DoorEntity[] = systemsManager.getEntities(DoorSystem.SystemTags.door);

    doorInteractors.forEach(doorInteractor => {
      const activeDoorIds = doorInteractor.activeInteractionIds;
      const activeDoors = doors.filter(door => activeDoorIds.includes(door.id));
      const inactiveDoors = doors.filter(door => !activeDoorIds.includes(door.id));

      activeDoors.forEach(activeDoor => activeDoor!.showIndicator());
      inactiveDoors.forEach(inactiveDoor => inactiveDoor!.hideIndicator());
    });
  }

  destroy(entity: any) {

  }
}
