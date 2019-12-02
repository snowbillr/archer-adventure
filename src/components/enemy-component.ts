import { HealthComponent } from './health-component';
import { PhiniteStateMachineComponent } from './phinite-state-machine-component';

export class EnemyComponent implements Phecs.Component {
  public static tag: string = 'enemy';

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    entity.components[HealthComponent.tag].onDeath(() => {
      entity.components[PhiniteStateMachineComponent.tag]
        .phiniteStateMachine.doTransition({ to: 'enemy-dead' });
    });
  }

  destroy() {

  }
}
