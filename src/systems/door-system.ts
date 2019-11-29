import { ExplorationScene } from '../scenes/exploration-scene';
import { DoorComponent } from '../components/door-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { IndicatorComponent } from '../components/indicator-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';

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
    const doors: Systems.DoorSystem.DoorEntity[] = systemsManager.getEntities(DoorComponent.tag);

    const enteringDoorIds = adventurer.components[InteractionCircleComponent.tag].interactionTracker.getEntityIds('entering');
    const enteringDoors = doors.filter(door => enteringDoorIds.includes(door.id));
    for (let enteringDoor of enteringDoors) {
      enteringDoor.components[IndicatorComponent.tag].showIndicator();
    }

    const exitingDoorIds = adventurer.components[InteractionCircleComponent.tag].interactionTracker.getEntityIds('exiting');
    const exitingDoors = doors.filter(door => exitingDoorIds.includes(door.id));
    for (let enteringDoor of exitingDoors) {
      enteringDoor.components[IndicatorComponent.tag].hideIndicator();
    }

    const activeDoorIds = adventurer.components[InteractionCircleComponent.tag].interactionTracker.getEntityIds('active');
    const activeDoors = doors.filter(door => activeDoorIds.includes(door.id));
    for (let door of activeDoors) {
      const interactionControlKey = adventurer.components[AdventurerComponent.tag].controls[door.components[InteractionCircleComponent.tag].interactionControl];
      if (interactionControlKey && interactionControlKey.isDown) {
        this.scene.loadNewArea(door.components[DoorComponent.tag].toAreaKey, door.components[DoorComponent.tag].toMarker);
      }
    }
  }
}
