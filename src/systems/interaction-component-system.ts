import 'phaser';
import { InteractionComponent } from '../components/interaction-component';
import { EntityManager } from '../lib/phecs/entity-manager';
import { AttachmentComponent } from '../components/attachment-component';

export class InteractionComponentSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities: Phecs.Entity[] = phEntities.getEntities(InteractionComponent);

    for (let entity of entities) {
      const intersectingEntityIds = this.getIntersectingInteractionIds(entity, entities);

      entity.getComponent(InteractionComponent).interactionTracker.update(intersectingEntityIds);
    };
  }

  private getIntersectingInteractionIds(entity: Phecs.Entity, allEntities: Phecs.Entity[]): string[] {
    return allEntities
      .filter(otherEntity => otherEntity.id !== entity.id)
      .filter(otherEntity => {
        const circle1 = entity.getComponent(AttachmentComponent).getAttachmentsByType('interaction')[0];
        const circle2 = otherEntity.getComponent(AttachmentComponent).getAttachmentsByType('interaction')[0];

        return circle1.overlaps(circle2);
      })
      .map(otherEntity => otherEntity.id);
  }
}
