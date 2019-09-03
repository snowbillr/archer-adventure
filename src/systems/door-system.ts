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
      doors.forEach(door => {
        const circle1 = doorInteractor.interactionCircle;
        const circle2 = door.interactionCircle;

        if (Phaser.Geom.Intersects.CircleToCircle(circle1, circle2)) {
          console.log(doorInteractor.id);
          console.log(door.id);
        } else {

        }
      })
    });
  }

  destroy(entity: any) {

  }
}
