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
    const adventurer = phEntities.getEntitiesByComponent(AdventurerComponent)[0];
    const doors = phEntities.getEntitiesByComponent(DoorComponent);

    doors.forEach(door => {
      const controlKey = adventurer.getComponent(AdventurerComponent).controls[door.getComponent(InteractionCircleComponent).interactionControl];

      const listener = () => {
        const activeInteractionIds = door.getComponent(InteractionCircleComponent).interactionTracker.getEntityIds('active');
        if (activeInteractionIds.includes(adventurer.id)) {
          this.scene.loadNewArea(door.getComponent(DoorComponent).toAreaKey, door.getComponent(DoorComponent).toMarker);
        }
      };

      this.listeners.push(listener);
      controlKey.on(Phaser.Input.Keyboard.Events.DOWN, listener);
    });
  }

  stop(phEntities: EntityManager) {
    const adventurer = phEntities.getEntitiesByComponent(AdventurerComponent)[0];
    const doors = phEntities.getEntitiesByComponent(DoorComponent);

    const controlKeys = new Set(doors.map(door => adventurer.getComponent(AdventurerComponent).controls[door.getComponent(InteractionCircleComponent).interactionControl]));

    this.listeners.forEach(listener => {
      controlKeys.forEach(controlKey => {
        controlKey.off(Phaser.Input.Keyboard.Events.DOWN, listener);
      });
    });

    this.listeners = [];
  }

  update(phEntities: EntityManager) {
    const adventurer = phEntities.getEntitiesByComponent(AdventurerComponent)[0];
    const doors = phEntities.getEntitiesByComponent(DoorComponent);

    const enteringDoorIds = adventurer.getComponent(InteractionCircleComponent).interactionTracker.getEntityIds('entering');
    const enteringDoors = doors.filter(door => enteringDoorIds.includes(door.id));
    for (let enteringDoor of enteringDoors) {
      enteringDoor.getComponent(IndicatorComponent).showIndicator();
    }

    const exitingDoorIds = adventurer.getComponent(InteractionCircleComponent).interactionTracker.getEntityIds('exiting');
    const exitingDoors = doors.filter(door => exitingDoorIds.includes(door.id));
    for (let enteringDoor of exitingDoors) {
      enteringDoor.getComponent(IndicatorComponent).hideIndicator();
    }
  }
}
