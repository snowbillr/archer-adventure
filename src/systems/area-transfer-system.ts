import { ExplorationScene } from '../scenes/exploration-scene';
import { EntityManager } from '../lib/phecs/entity-manager';
import { SpriteComponent } from '../components/sprite-component';

export class AreaTransferSystem implements Phecs.System {
  private scene: ExplorationScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as ExplorationScene;
  }

  update(phEntities: EntityManager) {
    // get all areaTransfer zones
    const zones = this.scene.areaManager.zones;

    // check if adventurer is in the zone
    const adventurerSprite = phEntities.getEntities('adventurer')[0].getComponent(SpriteComponent).sprite;
    const enteredZone = Object.values(zones).find(zone => {
      return zone.shape.contains(adventurerSprite.x, adventurerSprite.y);
    })

    // if they are, move to that new area/marker key
    if (enteredZone && enteredZone.data.toAreaKey && enteredZone.data.toMarker) {
      this.scene.loadNewArea(enteredZone.data.toAreaKey, enteredZone.data.toMarker);
    }
  }
}
