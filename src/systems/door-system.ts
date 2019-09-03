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
      doorEntity.toMapKey = data.toMapKey;
      doorEntity.toTilesetName = data.toTilesetName;
      doorEntity.toTilesetKey = data.toTilesetKey;
      doorEntity.toScale = data.toScale;
    }
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
        if (doorInteractor.controls[activeDoor.interactionControl!].isDown) {
          this.scene.loadNewArea(activeDoor.toMapKey, activeDoor.toTilesetName, activeDoor.toTilesetKey, activeDoor.toScale);
        }
      });
      inactiveDoors.forEach(inactiveDoor => inactiveDoor!.hideIndicator());
    });
  }

  destroy(entity: (Systems.DoorSystem.DoorEntity | Systems.DoorSystem.DoorInteractorEntity), tag: string) {
    if (tag === DoorSystem.SystemTags.door) {
      const doorEntity = entity as Systems.DoorSystem.DoorEntity;
      delete doorEntity.toMapKey;
      delete doorEntity.toTilesetName;
      delete doorEntity.toTilesetKey;
      delete doorEntity.toScale;
    }
  }
}
