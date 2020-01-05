import 'phaser';
import { SpriteComponent } from '../components/sprite-component';
import { HurtboxComponent } from '../components/hurtbox-component';
import { EntityManager } from '../lib/phecs/entity-manager';
import { Attachment } from '../lib/attachments/attachment';
import { AttachmentComponent } from '../components/attachment-component';

export class HasHurtboxesSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities = phEntities.getEntities(HurtboxComponent)
      .filter(entity => {
        return entity.getComponent(HurtboxComponent).enabled;
      });

    entities.forEach(entity => {
      const textureKey = entity.getComponent(SpriteComponent).sprite.frame.texture.key;
      const frameName = entity.getComponent(SpriteComponent).sprite.frame.name;

      const hurtboxFrame: Systems.HasHurtboxes.Frame = entity.getComponent(HurtboxComponent).hurtboxFrames.find((f: Systems.HasHurtboxes.Frame) => f.key === textureKey && f.frame === frameName) as Systems.HasHurtboxes.Frame;

      if (hurtboxFrame && hurtboxFrame.hurtboxes) {
        const attachments = entity.getComponent(AttachmentComponent).getAttachmentsByType('hurtbox');

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
