import 'phaser';
import { SpriteComponent } from '../components/sprite-component';
import { AttachmentComponent, Attachment } from '../components/attachment-component';
import { HitboxComponent } from '../components/hitbox-component';

export class HasHitboxesSystem implements SystemsManager.System {
  static SystemTags = {
    hasHitboxes: 'hasHitboxes',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  update(systemsManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasHitboxes.Entity[] = systemsManager.getEntities(HitboxComponent.tag);

    entities.forEach(entity => {
      const textureKey = entity.components[SpriteComponent.tag].sprite.frame.texture.key;
      const frameName = entity.components[SpriteComponent.tag].sprite.frame.name;

      const hitboxFrame: Systems.HasHitboxes.Frame = entity.components[HitboxComponent.tag].hitboxFrames.find((f: Systems.HasHitboxes.Frame) => f.key === textureKey && f.frame === frameName) as Systems.HasHitboxes.Frame;

      if (hitboxFrame && hitboxFrame.hitboxes) {
        const attachments = entity.components[AttachmentComponent.tag].getAttachmentsByType('hitbox');
        attachments.forEach((attachment: Attachment) => attachment.disable());

        hitboxFrame.hitboxes.forEach((hitbox, index) => {
          attachments[index].enable();
          attachments[index].setConfig({
            offsetX: hitbox.x,
            offsetY: hitbox.y,
            width: hitbox.width,
            height: hitbox.height,
          });
        });
      }
    });
  }
}
