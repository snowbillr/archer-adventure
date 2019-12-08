import 'phaser';

import { EntityManager } from '../lib/phecs/entity-manager';
import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';
import { AttachmentComponent } from '../components/attachment-component';
import { Attachment } from '../lib/attachment';
import { HealthComponent } from '../components/health-component';

import { BaseDamageSystem } from './base-damage-system';

const ARROW_DAMAGE = 1;


export class ArrowEnemyDamageSystem extends BaseDamageSystem {
  constructor() {
    super(
      {
        entityFetcher: phEntities => {
          return phEntities.getEntitiesByName('arrow')
                           .filter(arrow => {
                             const arrowState = arrow.components[PhiniteStateMachineComponent.tag].phiniteStateMachine.currentState.id;
                             return arrowState === 'arrow-flying';
                           });
        },
        boxType: 'hitbox',
      },
      {
        entityFetcher: phEntities => phEntities.getEntitiesByName('enemy'),
        boxType: 'hurtbox',
      },
      (arrow: Phecs.Entity, enemy: Phecs.Entity) => {
        arrow.components[PhiniteStateMachineComponent.tag].phiniteStateMachine.doTransition({ to: 'arrow-disabled' });
        enemy.components[HealthComponent.tag].decreaseHealth(ARROW_DAMAGE);
      }
    );
  }

}
