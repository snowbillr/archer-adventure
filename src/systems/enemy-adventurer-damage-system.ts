import { EnemyComponent } from '../components/enemy-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { InvulnerabilityComponent } from '../components/invulnerability-component';

import { BaseDamageSystem } from './base-damage-system';

const ENEMY_DAMAGE = 1;

export class EnemyAdventurerDamageSystem extends BaseDamageSystem {
  constructor(scene: Phaser.Scene) {
    super(
      {
        entityFetcher: phEntities => {
          return phEntities.getEntitiesByComponent(AdventurerComponent)
          .filter((adventurer: Phecs.Entity) => {
            return !adventurer.getComponent(InvulnerabilityComponent).isInvulnerable;
          });
        },
        boxType: 'hurtbox'
      },
      {
        entityFetcher: phEntities => phEntities.getEntitiesByComponent(EnemyComponent),
        boxType: 'hurtbox',
      },
      (adventurer: Phecs.Entity, enemy: Phecs.Entity) => {
        adventurer.getComponent(InvulnerabilityComponent).makeInvulnerable();
        adventurer.getComponent(AdventurerComponent).decreaseHealth(ENEMY_DAMAGE);
      }
    )
  }
}
