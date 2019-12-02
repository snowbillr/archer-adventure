import 'phaser';
import { SpriteComponent } from '../components/sprite-component';
import { HurtboxComponent } from '../components/hurtbox-component';
import { EntityManager } from '../lib/phecs/entity-manager';
import { Attachment } from '../lib/attachment';
import { AttachmentComponent } from '../components/attachment-component';

export class HasHurtboxesSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities = phEntities.getEntitiesByTag(HurtboxComponent.tag)
      .filter(entity => {
        return entity.components[HurtboxComponent.tag].enabled;
      });

    entities.forEach(entity => {
      const textureKey = entity.components[SpriteComponent.tag].sprite.frame.texture.key;
      const frameName = entity.components[SpriteComponent.tag].sprite.frame.name;

      const hurtboxFrame: Systems.HasHurtboxes.Frame = entity.components[HurtboxComponent.tag].hurtboxFrames.find((f: Systems.HasHurtboxes.Frame) => f.key === textureKey && f.frame === frameName) as Systems.HasHurtboxes.Frame;

      if (hurtboxFrame && hurtboxFrame.hurtboxes) {
        const attachments = entity.components[AttachmentComponent.tag].getAttachmentsByType('hurtbox');

        for (let i = 0; i < attachments.length; i++) {
          const hurtbox = hurtboxFrame.hurtboxes[i];
          const attachment = attachments[i];

          if (hurtbox) {
            attachment.enable();
            attachment.setConfig({
              offsetX: hurtbox.x,
              offsetY: hurtbox.y,
              width: hurtbox.width,
              height: hurtbox.height,
            });
          } else {
            attachment.disable();
          }
        }
      }
    });
  }
}
