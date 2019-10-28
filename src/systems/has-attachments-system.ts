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
      const attachment = new Attachment(type, config, {}, true, this.scene);
      entity.attachments.push(attachment);

      return attachment;
    }

    entity.createAttachment('a', {
      offsetX: 10,
      offsetY: 10,
      width: 10,
      height: 10,
    });
  }

  update(tagManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasAttachments.Entity[] = tagManager.getEntities(HasAttachmentsSystem.SystemTags.hasAttachments);

    for (let entity of entities) {
      for (let attachment of entity.attachments) {
        attachment.syncToSprite(entity.sprite);
      }
    }
  }
}

class Attachment implements Systems.HasAttachments.Attachment {
  private shape: Phaser.Geom.Rectangle;

  private debugRect?: Phaser.GameObjects.Rectangle;

  constructor(
    private type: string,
    private config: Systems.HasAttachments.AttachmentConfig,
    public properties: {} = {},
    debug: boolean = false,
    scene: Phaser.Scene) {
      this.shape = new Phaser.Geom.Rectangle(0, 0, config.width, config.height);
      if (debug && scene) {
        this.debugRect = scene.add.rectangle(this.shape.x, this.shape.y, this.shape.width, this.shape.height, 0x0000FF);
      }
  }

  syncToSprite(sprite: Phaser.GameObjects.Sprite) {
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

    console.log('sprite x y', sprite.x, sprite.y)
    console.log('shape x y', this.shape.x, this.shape.y)

    if (this.debugRect) {
      this.debugRect.x = x;
      this.debugRect.y = y;
      this.debugRect.width = width;
      this.debugRect.height = height;
    }
  }
}
