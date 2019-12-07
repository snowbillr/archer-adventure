import 'phaser';
import { EntityManager } from '../lib/phecs/entity-manager';
import { EnemyComponent } from '../components/enemy-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { AttachmentComponent } from '../components/attachment-component';
import { Attachment } from '../lib/attachment';
import { InvulnerabilityComponent } from '../components/invulnerability-component';

export class EnemyAdventurerDamageSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const adventurer = phEntities.getEntitiesByTag(AdventurerComponent.tag)[0];
    const enemies = phEntities.getEntitiesByTag(EnemyComponent.tag);

    const adventurerHurtboxes = adventurer.components[AttachmentComponent.tag]
                                         .getAttachmentsByType('hurtbox');

    for (let enemy of enemies) {
      const enemyHitboxes = enemy.components[AttachmentComponent.tag]
                                 .getAttachmentsByType('hitbox');

      if (this.isAdventurerHit(adventurerHurtboxes, enemyHitboxes)) {
        // console.log('hit')
        adventurer.components[InvulnerabilityComponent.tag].makeInvulnerable();
        // turn on invulnerability component for a timed amount
        // damage adventurer
      }
    }
  }

  private isAdventurerHit(adventurerHurtboxes: Attachment[], enemyHitboxes: Attachment[]): boolean {
    let overlapping = false;
    for (let hurtbox of adventurerHurtboxes) {
      if (overlapping) break;

      for (let hitbox of enemyHitboxes) {
        if (overlapping) break;

        overlapping = hurtbox.overlaps(hitbox);
      }
    }

    return overlapping;
  }
}
