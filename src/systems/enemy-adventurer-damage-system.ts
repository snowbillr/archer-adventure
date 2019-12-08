import { EnemyComponent } from '../components/enemy-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { InvulnerabilityComponent } from '../components/invulnerability-component';
import { HealthComponent } from '../components/health-component';

import { BaseDamageSystem } from './base-damage-system';

const ENEMY_DAMAGE = 1;

export class EnemyAdventurerDamageSystem extends BaseDamageSystem {
  constructor() {
    super(
      {
        entityFetcher: phEntities => {
          return phEntities.getEntitiesByTag(AdventurerComponent.tag)
          .filter((adventurer: Phecs.Entity) => {
            return !adventurer.components[InvulnerabilityComponent.tag].isInvulnerable;
          });
        },
        boxType: 'hurtbox'
      },
      {
        entityFetcher: phEntities => phEntities.getEntitiesByTag(EnemyComponent.tag),
        boxType: 'hurtbox',
      },
      (adventurer: Phecs.Entity, enemy: Phecs.Entity) => {
        adventurer.components[InvulnerabilityComponent.tag].makeInvulnerable();
        adventurer.components[HealthComponent.tag].decreaseHealth(ENEMY_DAMAGE);
      }
    )
  }
}
