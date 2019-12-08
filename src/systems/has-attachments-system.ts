import { SpriteComponent } from '../components/sprite-component';
import { AttachmentComponent } from '../components/attachment-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasAttachmentsSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities = phEntities.getEntitiesByComponent(AttachmentComponent);

    for (let entity of entities) {
      for (let attachment of entity.getComponent(AttachmentComponent).attachments) {
        attachment.syncToSprite(entity.getComponent(SpriteComponent).sprite);
      }
    }
  }
}

