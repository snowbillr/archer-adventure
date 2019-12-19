import { BaseInteractionSystem } from './base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';
import { DoorComponent } from '../components/door-component';
import { ExplorationScene } from '../scenes/exploration-scene';

export class AdventurerDoorSystem extends BaseInteractionSystem {
  private scene: ExplorationScene;

  constructor(scene: Phaser.Scene) {
    super(AdventurerComponent, DoorComponent)

    this.scene = scene as ExplorationScene;
  }

  onEnter(door: Phecs.Entity) {
    door.getComponent(SpriteIndicatorComponent).indicator.show();
  }

  onInteraction(door: Phecs.Entity) {
    const doorComponent = door.getComponent(DoorComponent);

    this.scene.loadNewArea(doorComponent.toAreaKey, doorComponent.toMarker);
  }

  onExit(door: Phecs.Entity) {
    door.getComponent(SpriteIndicatorComponent).indicator.hide();
  }
}
