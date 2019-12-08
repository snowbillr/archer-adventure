import { EntityManager } from '../lib/phecs/entity-manager';
import { EnemyComponent } from '../components/enemy-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { AttachmentComponent } from '../components/attachment-component';
import { Attachment } from '../lib/attachment';
import { InvulnerabilityComponent } from '../components/invulnerability-component';
import { HealthComponent } from '../components/health-component';

import { BaseDamageSystem } from './base-damage-system';

const ENEMY_DAMAGE = 1;

export class EnemyAdventurerDamageSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const adventurers = phEntities.getEntitiesByTag(AdventurerComponent.tag);
    const enemies = phEntities.getEntitiesByTag(EnemyComponent.tag);






    if (adventurers[0].components[InvulnerabilityComponent.tag].isInvulnerable) return;

    for (let adventurer of adventurers) {
      const adventurerHurtboxes = adventurer.components[AttachmentComponent.tag]
                                            .getAttachmentsByType('hurtbox')
                                            .filter((hurtbox: Attachment) => hurtbox.isEnabled())

      for (let enemy of enemies) {
        const enemyHitboxes = enemy.components[AttachmentComponent.tag]
                                  .getAttachmentsByType('hitbox')
                                  .filter((hitbox: Attachment) => hitbox.isEnabled())

        if (this.doBoxesOverlap(adventurerHurtboxes, enemyHitboxes)) {
          this.onHit(adventurer, enemy);
        }
      }
    }
  }

  private doBoxesOverlap(boxes1: Attachment[], boxes2: Attachment[]) {
    let overlapping = false;

    for (let box1 of boxes1) {
      if (overlapping) break;
    
      for (let box2 of boxes2) {
        if (overlapping) break;

        overlapping = box1.overlaps(box2);
      }
    }

    return overlapping;
  }

  private onHit(adventurer: Phecs.Entity, enemy: Phecs.Entity) {
    adventurer.components[InvulnerabilityComponent.tag].makeInvulnerable();
    adventurer.components[HealthComponent.tag].decreaseHealth(ENEMY_DAMAGE);
  }
}
