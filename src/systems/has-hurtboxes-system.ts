import 'phaser';
import { SpriteComponent } from '../components/sprite-component';
import { AttachmentComponent, Attachment } from '../components/attachment-component';
import { HurtboxComponent } from '../components/hurtbox-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class HasHurtboxesSystem implements Phecs.System {
  update(phEntities: EntityManager) {
    const entities: Systems.HasHurtboxes.Entity[] = phEntities.getEntitiesByTag(HurtboxComponent.tag);

    entities.forEach(entity => {
      const textureKey = entity.components[SpriteComponent.tag].sprite.frame.texture.key;
      const frameName = entity.components[SpriteComponent.tag].sprite.frame.name;

      const hurtboxFrame: Systems.HasHurtboxes.Frame = entity.components[HurtboxComponent.tag].hurtboxFrames.find((f: Systems.HasHurtboxes.Frame) => f.key === textureKey && f.frame === frameName) as Systems.HasHurtboxes.Frame;

      if (hurtboxFrame && hurtboxFrame.hurtboxes) {
        const attachments = entity.components[AttachmentComponent.tag].getAttachmentsByType('hurtbox');
        attachments.forEach((attachment: Attachment) => attachment.disable());

        hurtboxFrame.hurtboxes.forEach((hurtbox, index) => {
          attachments[index].enable();
          attachments[index].setConfig({
            offsetX: hurtbox.x,
            offsetY: hurtbox.y,
            width: hurtbox.width,
            height: hurtbox.height,
          });
        });
      }
    });
  }
}
