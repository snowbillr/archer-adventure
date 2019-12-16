import 'phaser';
import { AdventurerComponent } from '../components/adventurer-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasControlsSystem implements Phecs.System {
  stop(phEntities: EntityManager) {
    const entities = phEntities.getEntities(AdventurerComponent);

    entities.forEach(entity => {
      Object.values(entity.getComponent(AdventurerComponent).controls).forEach((key) => {
        (key as Phaser.Input.Keyboard.Key).removeAllListeners();
      });
    });
  }
}
