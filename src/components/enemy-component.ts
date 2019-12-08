import { HealthComponent } from './health-component';
import { PhiniteStateMachineComponent } from './phinite-state-machine-component';

export class EnemyComponent implements Phecs.Component {
  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    const healthComponent = entity.getComponent(HealthComponent);
    const phiniteStateMachine = entity.getComponent(PhiniteStateMachineComponent).phiniteStateMachine;

    healthComponent.onDamage(() => {
      phiniteStateMachine.doTransition({ to: 'enemy-stun' });
    });

    healthComponent.onDeath(() => {
      phiniteStateMachine.doTransition({ to: 'enemy-dead' });
    });
  }

  destroy() {

  }
}
