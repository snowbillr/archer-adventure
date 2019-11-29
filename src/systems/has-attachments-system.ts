import { SpriteComponent } from '../components/sprite-component';
import { AttachmentComponent } from '../components/attachment-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasAttachmentsSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities = phEntities.getEntitiesByTag(AttachmentComponent.tag);

    for (let entity of entities) {
      for (let attachment of entity.components[AttachmentComponent.tag].attachments) {
        attachment.syncToSprite(entity.components[SpriteComponent.tag].sprite);
      }
    }
  }
}

