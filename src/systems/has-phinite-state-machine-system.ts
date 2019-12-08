import 'phaser';

import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasPhiniteStateMachineSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities = phEntities.getEntitiesByComponent(PhiniteStateMachineComponent)

    entities.forEach(entity => {
      entity.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.update();
    });
  }
}
