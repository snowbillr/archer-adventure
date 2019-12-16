import 'phaser';

import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';
import { HealthComponent } from '../components/health-component';

import { BaseDamageSystem } from './base-damage-system';
import { EnemyComponent } from '../components/enemy-component';

const ARROW_DAMAGE = 1;

export class ArrowEnemyDamageSystem extends BaseDamageSystem {
  constructor() {
    super(
      {
        entityFetcher: phEntities => {
          return phEntities.getEntities('arrow')
                           .filter(arrow => {
                             const arrowState = arrow.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.currentState.id;
                             return arrowState === 'arrow-flying';
                           });
        },
        boxType: 'hitbox',
      },
      {
        entityFetcher: phEntities => phEntities.getEntities(EnemyComponent),
        boxType: 'hurtbox',
      },
      (arrow: Phecs.Entity, enemy: Phecs.Entity) => {
        arrow.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.doTransition({ to: 'arrow-disabled' });
        enemy.getComponent(HealthComponent).decreaseHealth(ARROW_DAMAGE);
      }
    );
  }

}
