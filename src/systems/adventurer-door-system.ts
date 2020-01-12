import { BaseInteractionSystem } from './base-systems/base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';
import { DoorComponent } from '../components/door-component';
import { ExplorationScene } from '../scenes/exploration-scene';

export class AdventurerDoorSystem extends BaseInteractionSystem {
  private explorationScene: ExplorationScene;

  constructor(scene: Phaser.Scene) {
    super(scene, AdventurerComponent, DoorComponent)

    this.explorationScene = scene as ExplorationScene;
  }

  onEnter(adventurer: Phecs.Entity, door: Phecs.Entity) {
    door.getComponent(SpriteIndicatorComponent).indicator.show();
  }

  onInteraction(adventurer: Phecs.Entity, door: Phecs.Entity) {
    const doorComponent = door.getComponent(DoorComponent);

    this.explorationScene.transferToArea(doorComponent.toAreaKey, doorComponent.toMarker);
  }

  onExit(adventurer: Phecs.Entity, door: Phecs.Entity) {
    door.getComponent(SpriteIndicatorComponent).indicator.hide();
  }
}
