import 'phaser';
import { AdventurerComponent } from '../components/adventurer-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasControlsSystem implements Phecs.System {
  static SystemTags = {
    hasControls: 'hasControls',
  };

  /*
  stop(phEntities: EntityManager) {
    const entities: Systems.HasControls.Entity[] = phEntities.getEntitiesByTag(AdventurerComponent.tag);

    entities.forEach(entity => {
      Object.values(entity.components[AdventurerComponent.tag].controls).forEach((key) => {
        (key as Phaser.Input.Keyboard.Key).removeAllListeners();
      });
    });
  }
  */
}
