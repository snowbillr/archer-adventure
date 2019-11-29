import 'phaser';
import { AdventurerComponent } from '../components/adventurer-component';

export class HasControlsSystem implements SystemsManager.System {
  static SystemTags = {
    hasControls: 'hasControls',
  };

  stop(systemsManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasControls.Entity[] = systemsManager.getEntities(AdventurerComponent.tag);

    entities.forEach(entity => {
      Object.values(entity.components[AdventurerComponent.tag].controls).forEach((key) => {
        (key as Phaser.Input.Keyboard.Key).removeAllListeners();
      });
    });
  }
}
