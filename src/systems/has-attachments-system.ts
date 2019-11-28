import { SpriteComponent } from '../components/sprite-component';
import { AttachmentComponent } from '../components/attachment-component';

export class HasAttachmentsSystem implements SystemsManager.System {
  static SystemTags = {
    hasAttachments: 'hasAttachments',
  };

  update(tagManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasAttachments.Entity[] = tagManager.getEntities(AttachmentComponent.tag);

    for (let entity of entities) {
      for (let attachment of entity.components[AttachmentComponent.tag].attachments) {
        attachment.syncToSprite(entity.components[SpriteComponent.tag].sprite);
      }
    }
  }
}

