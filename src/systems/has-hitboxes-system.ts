import 'phaser';

export class HasHitboxesSystem implements SystemsManager.System {
  static SystemTags = {
    hasHitboxes: 'hasHitboxes',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.HasHitboxes.Entity, data: SystemsManager.EntityRegistrationData): void {
    entity.hitboxFrames = this.scene.cache.json.get(data.hitboxesKey).frames;

    const maxAttachmentCount = entity.hitboxFrames
      .map(frame => frame.hitboxes.length)
      .reduce((localMaxAttachmentCount, attachmentCount) => Math.max(localMaxAttachmentCount, attachmentCount), 0);

    for (let i = 0; i < maxAttachmentCount; i++) {
      entity.createAttachment('hitbox', {
        offsetX: 0,
        offsetY: 0,
        width: 0,
        height: 0,
      });
    }
  }

  update(systemsManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasHitboxes.Entity[] = systemsManager.getEntities(HasHitboxesSystem.SystemTags.hasHitboxes);

    entities.forEach(entity => {
      const textureKey = entity.sprite.frame.texture.key;
      const frameName = entity.sprite.frame.name;

      const hitboxFrame: Systems.HasHitboxes.Frame = entity.hitboxFrames.find((f: Systems.HasHitboxes.Frame) => f.key === textureKey && f.frame === frameName) as Systems.HasHitboxes.Frame;

      if (hitboxFrame && hitboxFrame.hitboxes) {
        const attachments = entity.getAttachmentsByType('hitbox');
        attachments.forEach(attachment => attachment.disable());

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
