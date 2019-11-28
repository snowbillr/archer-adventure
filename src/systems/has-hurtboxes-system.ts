import 'phaser';
import { SpriteComponent } from '../components/sprite-component';
import { AttachmentComponent, Attachment } from '../components/attachment-component';

export class HasHurtboxesSystem implements SystemsManager.System {
  static SystemTags = {
    hasHurtboxes: 'hasHurtboxes',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.HasHurtboxes.Entity, data: SystemsManager.EntityRegistrationData): void {
    entity.hurtboxFrames = this.scene.cache.json.get(data.hurtboxesKey).frames;

    const maxAttachmentCount = entity.hurtboxFrames
      .map(frame => frame.hurtboxes.length)
      .reduce((localMaxAttachmentCount, attachmentCount) => Math.max(localMaxAttachmentCount, attachmentCount), 0);

    for (let i = 0; i < maxAttachmentCount; i++) {
      entity.components[AttachmentComponent.tag].createAttachment('hurtbox', {
        offsetX: 0,
        offsetY: 0,
        width: 0,
        height: 0,
      });
    }
  }

  update(systemsManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasHurtboxes.Entity[] = systemsManager.getEntities(HasHurtboxesSystem.SystemTags.hasHurtboxes);

    entities.forEach(entity => {
      const textureKey = entity.components[SpriteComponent.tag].sprite.frame.texture.key;
      const frameName = entity.components[SpriteComponent.tag].sprite.frame.name;

      const hurtboxFrame: Systems.HasHurtboxes.Frame = entity.hurtboxFrames.find((f: Systems.HasHurtboxes.Frame) => f.key === textureKey && f.frame === frameName) as Systems.HasHurtboxes.Frame;

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
