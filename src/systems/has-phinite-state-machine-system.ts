import 'phaser';

import { PhiniteStateMachine } from '../lib/phinite-state-machine/phinite-state-machine';
import { TransitionType } from '../lib/phinite-state-machine/transition-type';
import { BaseScene } from '../scenes/base-scene';
import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';

export class HasPhiniteStateMachineSystem implements SystemsManager.System {
  static SystemTags = {
    hasPhiniteStateMachine: 'hasPhiniteStateMachine',
  };

  update(tagManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasPhiniteStateMachine.Entity<any>[] = tagManager.getEntities(PhiniteStateMachineComponent.tag)

    entities.forEach(entity => {
      entity.components[PhiniteStateMachineComponent.tag].phiniteStateMachine.update();
    });
  }
}
