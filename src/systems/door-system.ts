import { ExplorationScene } from '../scenes/exploration-scene';
import { PortalComponent } from '../components/portal-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { IndicatorComponent } from '../components/indicator-component';

export class DoorSystem implements SystemsManager.System {
  static SystemTags = {
    door: 'door',
    doorInteractor: 'doorInteractor',
  };

  private scene: ExplorationScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as ExplorationScene;
  }

  update(systemsManager: SystemsManager.SystemsManager) {
    const adventurer: Systems.DoorSystem.DoorInteractorEntity = systemsManager.getEntities<Systems.DoorSystem.DoorInteractorEntity>(AdventurerComponent.tag)[0];
    const doors: Systems.DoorSystem.DoorEntity[] = systemsManager.getEntities(PortalComponent.tag);

    const enteringDoorIds = adventurer.interactionTracker.getEntityIds('entering');
    const enteringDoors = doors.filter(door => enteringDoorIds.includes(door.id));
    for (let enteringDoor of enteringDoors) {
      enteringDoor.components[IndicatorComponent.tag].showIndicator();
    }

    const exitingDoorIds = adventurer.interactionTracker.getEntityIds('exiting');
    const exitingDoors = doors.filter(door => exitingDoorIds.includes(door.id));
    for (let enteringDoor of exitingDoors) {
      enteringDoor.components[IndicatorComponent.tag].hideIndicator();
    }

    const activeDoorIds = adventurer.interactionTracker.getEntityIds('active');
    const activeDoors = doors.filter(door => activeDoorIds.includes(door.id));
    for (let door of activeDoors) {
      const interactionControlKey = adventurer.controls[door.interactionControl!];
      if (interactionControlKey && interactionControlKey.isDown) {
        this.scene.loadNewArea(door.components[PortalComponent.tag].toAreaKey, door.components[PortalComponent.tag].toMarker);
      }
    }
  }
}
