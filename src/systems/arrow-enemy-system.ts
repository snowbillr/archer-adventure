import 'phaser';

import { EntityManager } from '../lib/phecs/entity-manager';
import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';
import { AttachmentComponent } from '../components/attachment-component';
import { Attachment } from '../lib/attachment';

export class ArrowEnemySystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const enemies = phEntities.getEntitiesByName('enemy');
    const arrows = phEntities.getEntitiesByName('arrow')
      .filter(arrow => {
        const arrowState = arrow.components[PhiniteStateMachineComponent.tag].phiniteStateMachine.currentState.id;
        return arrowState === 'arrow-flying';
      });

    arrows.forEach(arrow => {
      const arrowHitboxes = arrow.components[AttachmentComponent.tag].getAttachmentsByType('hitbox')
                        .filter((hitbox: Attachment) => hitbox.isEnabled()) as Attachment[];

      enemies.forEach(enemy => {
        const enemyHurtboxes = enemy.components[AttachmentComponent.tag].getAttachmentsByType('hurtbox')
                            .filter((hurtbox: Attachment) => hurtbox.isEnabled()) as Attachment[];

        let isHit = false;
        for (let arrowHitbox of arrowHitboxes) {
          enemyHurtboxes.forEach((hurtbox: Attachment) => {
            if (!isHit && arrowHitbox.overlaps(hurtbox)) {
              isHit = true;
            }
          });
        }

        if (isHit) {
          arrow.components[PhiniteStateMachineComponent.tag].phiniteStateMachine.doTransition({ to: 'arrow-disabled' });
          enemy.components[PhiniteStateMachineComponent.tag].phiniteStateMachine.doTransition({ to: 'enemy-dead' });
        }
      });
    });
  }
}
