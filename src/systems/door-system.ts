import { ExplorationScene } from '../scenes/exploration-scene';
import { DoorComponent } from '../components/door-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { IndicatorComponent } from '../components/indicator-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class DoorSystem implements Phecs.System {
  private scene: ExplorationScene;
  private listeners: (() => void)[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene as ExplorationScene;
    this.listeners = [];
  }

  start(phEntities: EntityManager) {
    const adventurer = phEntities.getEntitiesByTag(AdventurerComponent.tag)[0];
    const doors = phEntities.getEntitiesByName(DoorComponent.tag);

    doors.forEach(door => {
      const controlKey = adventurer.components[AdventurerComponent.tag].controls[door.components[InteractionCircleComponent.tag].interactionControl];

      const listener = () => {
        const activeInteractionIds = door.components[InteractionCircleComponent.tag].interactionTracker.getEntityIds('active');
        if (activeInteractionIds.includes(adventurer.id)) {
          this.scene.loadNewArea(door.components[DoorComponent.tag].toAreaKey, door.components[DoorComponent.tag].toMarker);
        }
      };

      this.listeners.push(listener);
      controlKey.on(Phaser.Input.Keyboard.Events.DOWN, listener);
    });
  }

  stop(phEntities: EntityManager) {
    const adventurer = phEntities.getEntitiesByTag(AdventurerComponent.tag)[0];
    const doors = phEntities.getEntitiesByTag('sign');

    const controlKeys = new Set(doors.map(door => adventurer.components[AdventurerComponent.tag].controls[door.components[InteractionCircleComponent.tag].interactionControl]));

    this.listeners.forEach(listener => {
      controlKeys.forEach(controlKey => {
        controlKey.off(Phaser.Input.Keyboard.Events.DOWN, listener);
      });
    });

    this.listeners = [];
  }

  update(phEntities: EntityManager) {
    const adventurer = phEntities.getEntitiesByTag(AdventurerComponent.tag)[0];
    const doors = phEntities.getEntitiesByName(DoorComponent.tag);

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
  }
}
