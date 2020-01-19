import { ExplorationScene } from '../scenes/exploration-scene';
import { EntityManager } from '../lib/phecs/entity-manager';
import { SpriteComponent } from '../components/sprite-component';

export class AreaTransferSystem implements Phecs.System {
  private scene: ExplorationScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as ExplorationScene;
  }

  update(phEntities: EntityManager) {
    const zones = this.scene.areaManager.zones;

    const adventurerSprite = phEntities.getEntities('adventurer')[0].getComponent(SpriteComponent).sprite;
    const enteredZone = Object.values(zones).find(zone => {
      return zone.shape.contains(adventurerSprite.x, adventurerSprite.y);
    })

    if (enteredZone && enteredZone.data.toAreaKey && enteredZone.data.toMarker) {
      this.scene.transferToArea(enteredZone.data.toAreaKey, enteredZone.data.toMarker);
    }
  }
}
