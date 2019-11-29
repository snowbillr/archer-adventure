import 'phaser';

import { PhiniteStateMachine } from '../lib/phinite-state-machine/phinite-state-machine';
import { TransitionType } from '../lib/phinite-state-machine/transition-type';
import { BaseScene } from '../scenes/base-scene';
import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasPhiniteStateMachineSystem implements Phecs.System {
  static SystemTags = {
    hasPhiniteStateMachine: 'hasPhiniteStateMachine',
  };

  update(phEntities: EntityManager) {
    const entities: Systems.HasPhiniteStateMachine.Entity<any>[] = phEntities.getEntitiesByTag(PhiniteStateMachineComponent.tag)

    entities.forEach(entity => {
      entity.components[PhiniteStateMachineComponent.tag].phiniteStateMachine.update();
    });
  }
}
