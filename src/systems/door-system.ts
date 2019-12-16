import { DoorComponent } from '../components/door-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { ExplorationScene } from '../scenes/exploration-scene';
import { BaseAdventurerInteractionControlSystem } from './base-adventurer-interaction-control-system';

export class DoorSystem extends BaseAdventurerInteractionControlSystem {
  private scene: ExplorationScene;

  constructor(scene: Phaser.Scene) {
    super(AdventurerComponent, DoorComponent);

    this.scene = scene as ExplorationScene;
  }

  onInteraction(door: Phecs.Entity) {
    const doorComponent = door.getComponent(DoorComponent);

    this.scene.loadNewArea(doorComponent.toAreaKey, doorComponent.toMarker);
  }
}
