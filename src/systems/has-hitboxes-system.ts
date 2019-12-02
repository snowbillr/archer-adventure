import 'phaser';
import { SpriteComponent } from '../components/sprite-component';
import { AttachmentComponent } from '../components/attachment-component';
import { Attachment } from "../lib/attachment";
import { HitboxComponent } from '../components/hitbox-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasHitboxesSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities = phEntities.getEntitiesByTag(HitboxComponent.tag)
      .filter(entity => {
        return entity.components[HitboxComponent.tag].enabled;
      });

    entities.forEach(entity => {
      const textureKey = entity.components[SpriteComponent.tag].sprite.frame.texture.key;
      const frameName = entity.components[SpriteComponent.tag].sprite.frame.name;

      const hitboxFrame: Systems.HasHitboxes.Frame = entity.components[HitboxComponent.tag].hitboxFrames.find((f: Systems.HasHitboxes.Frame) => f.key === textureKey && f.frame === frameName) as Systems.HasHitboxes.Frame;

      if (hitboxFrame && hitboxFrame.hitboxes) {
        const attachments = entity.components[AttachmentComponent.tag].getAttachmentsByType('hitbox');

        for (let i = 0; i < attachments.length; i++) {
          const hitbox = hitboxFrame.hitboxes[i];
          const attachment = attachments[i];

          if (hitbox) {
            attachment.enable();
            attachment.setConfig({
              offsetX: hitbox.x,
              offsetY: hitbox.y,
              width: hitbox.width,
              height: hitbox.height,
            });
          } else {
            attachment.disable();
          }
        }
      }
    });
  }
}
