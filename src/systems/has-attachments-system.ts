export class HasAttachmentsSystem implements SystemsManager.System {
  static SystemTags = {
    hasAttachments: 'hasAttachments',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registerEntity(entity: Systems.HasAttachments.Entity, data: SystemsManager.EntityRegistrationData, tag: string) {
    entity.attachments = [];
    entity.createAttachment = (type: string, config: Systems.HasAttachments.AttachmentConfig) => {
      const attachment = new Attachment(type, config, {}, data.attachmentDebug, this.scene);
      entity.attachments.push(attachment);

      return attachment;
    }
    entity.getAttachmentsByType = (type: string) => {
      return entity.attachments.filter(attachment => attachment.type === type);
    }
  }

  update(tagManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasAttachments.Entity[] = tagManager.getEntities(HasAttachmentsSystem.SystemTags.hasAttachments);

    for (let entity of entities) {
      for (let attachment of entity.attachments) {
        attachment.syncToSprite(entity.sprite);
      }
    }
  }

  destroy(entity: Systems.HasAttachments.Entity) {
    entity.attachments.forEach(attachment => attachment.destroy());

    delete entity.attachments;
    delete entity.getAttachmentsByType;
    delete entity.createAttachment;
  }
}

class Attachment implements Systems.HasAttachments.Attachment {
  public type: string;
  public properties: Systems.HasAttachments.AttachmentProperties;

  private config: Systems.HasAttachments.AttachmentConfig;
  private shape: Phaser.Geom.Rectangle;
  private enabled: boolean;

  private debugRect?: Phaser.GameObjects.Rectangle;

  constructor(type: string, config: Systems.HasAttachments.AttachmentConfig, properties: {} = {}, debug: boolean = false, scene: Phaser.Scene) {
      this.type = type;
      this.config = config;
      this.properties = properties;

      this.enabled = true;
      this.shape = new Phaser.Geom.Rectangle(0, 0, config.width, config.height);

      if (debug && scene) {
        this.debugRect = scene.add.rectangle(this.shape.x, this.shape.y, this.shape.width, this.shape.height, 0x0000FF, 0.5);
        this.debugRect.setDepth(5);
      }
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  setConfig(config: Systems.HasAttachments.AttachmentConfig) {
    this.config = config;
  }

  syncToSprite(sprite: Phaser.GameObjects.Sprite) {
    if (!this.enabled) {
      return;
    }

    const scaleX = sprite.scaleX;
    const scaleY = sprite.scaleY;

    const offsetX = sprite.flipX ? this.config.offsetX * -1 : this.config.offsetX;
    const offsetY = sprite.flipY ? this.config.offsetY * -1 : this.config.offsetY;

    const width = scaleX * this.config.width;
    const height = scaleY * this.config.height;
    const x = (sprite.x + (offsetX * scaleX)) - (width * sprite.originX);
    const y = (sprite.y + (offsetY * scaleY)) - (height * sprite.originY);

    this.shape.x = x;
    this.shape.y = y;
    this.shape.width = width;
    this.shape.height = height;

    if (this.debugRect) {
      if (this.enabled) {
        this.debugRect.fillColor = 0x0000FF;
      } else {
        this.debugRect.fillColor = 0xFF0000;
      }

      this.debugRect.x = x;
      this.debugRect.y = y;
      this.debugRect.width = width;
      this.debugRect.height = height;
    }
  }

  destroy() {
    if (this.debugRect) {
      this.debugRect.destroy();
    }
  }
}
