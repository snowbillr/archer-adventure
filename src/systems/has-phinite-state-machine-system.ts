import 'phaser';

import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasPhiniteStateMachineSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities = phEntities.getEntitiesByTag(PhiniteStateMachineComponent.tag)

    entities.forEach(entity => {
      entity.components[PhiniteStateMachineComponent.tag].phiniteStateMachine.update();
    });
  }
}
