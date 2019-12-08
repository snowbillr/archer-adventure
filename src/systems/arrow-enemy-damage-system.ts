import 'phaser';

import { EntityManager } from '../lib/phecs/entity-manager';
import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';
import { AttachmentComponent } from '../components/attachment-component';
import { Attachment } from '../lib/attachment';
import { HealthComponent } from '../components/health-component';

const ARROW_DAMAGE = 1;

export class ArrowEnemyDamageSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const enemies = phEntities.getEntitiesByName('enemy');
    const arrows = phEntities.getEntitiesByName('arrow')
      .filter(arrow => {
        const arrowState = arrow.components[PhiniteStateMachineComponent.tag].phiniteStateMachine.currentState.id;
        return arrowState === 'arrow-flying';
      });




    for (let arrow of arrows) {
      const arrowHitboxes = arrow.components[AttachmentComponent.tag]
                                 .getAttachmentsByType('hitbox')
                                 .filter((hitbox: Attachment) => hitbox.isEnabled()) as Attachment[];

      for (let enemy of enemies) {
        const enemyHurtboxes = enemy.components[AttachmentComponent.tag]
                                    .getAttachmentsByType('hurtbox')
                                    .filter((hurtbox: Attachment) => hurtbox.isEnabled()) as Attachment[];

        if (this.doBoxesOverlap(arrowHitboxes, enemyHurtboxes)) {
          this.onHit(arrow, enemy);
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

  private onHit(arrow: Phecs.Entity, enemy: Phecs.Entity) {
    arrow.components[PhiniteStateMachineComponent.tag].phiniteStateMachine.doTransition({ to: 'arrow-disabled' });
    enemy.components[HealthComponent.tag].decreaseHealth(ARROW_DAMAGE);
  }
}
