import 'phaser';

import { BaseSystem } from '../lib/systems/base-system';

export class HasHurtboxesSystem<T extends Systems.HasHurtboxes.Entity & Systems.HasSprite.Entity> extends BaseSystem<T> implements SystemsManager.System {
  static SystemTags = {
    hasHurtboxes: 'hasHurtboxes',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasHurtboxesSystem.SystemTags.hasHurtboxes, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: SystemsManager.EntityRegistrationData): void {
    entity.hurtboxFrames = this.scene.cache.json.get(data.hurtboxesKey).frames;

    entity.rectanglePool = [];
    entity.activeRectangles = [];

    entity.debug = data.debug;
    entity.debugColor = 0x00FF00;
    entity.debugRectangles = [];
    entity.debugPointerPosition = { x: 0, y: 0 };
  }

  update(tagManager: SystemsManager.SystemsManager) {
    super.update(tagManager);

    const entities = this.entity1s;
    entities.forEach(entity => {
      this.disableHitboxes(entity);

      const key = entity.sprite.frame.texture.key;
      const frame = entity.sprite.frame.name;

      const hitboxFrame: Systems.HasHurtboxes.Frame = entity.hurtboxFrames.find((h: Systems.HasHurtboxes.Frame) => h.key === key && h.frame === frame) as Systems.HasHurtboxes.Frame;
      if (hitboxFrame && hitboxFrame.hurtboxes) {
        hitboxFrame.hurtboxes.forEach((hitbox: Systems.HasHurtboxes.Shape) => {
          if (hitbox.type === 'rectangle') {
            this.setRectangleHitbox(entity, hitbox);
          } else {
            throw 'unsupported hitbox type';
          }
        });
      }

      if (entity.debug) {
        entity.debugPointerPosition = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main) as { x: number, y: number };
        this.renderDebugHitboxes(entity);
      }
    });
  }

  private renderDebugHitboxes(entity: T) {
    const point = new Phaser.Geom.Point(entity.debugPointerPosition.x, entity.debugPointerPosition.y);

    entity.activeRectangles.forEach((activeRectangle, i) => {
      if (Phaser.Geom.Rectangle.ContainsPoint(activeRectangle, point)) {
        entity.debugColor = 0xFF0000;
      } else {
        entity.debugColor = 0x00FF00;
      }

      const debugRectangle = entity.debugRectangles[i];

      debugRectangle.visible = true;
      debugRectangle.fillColor = entity.debugColor;

      debugRectangle.setOrigin(0, 0);
      debugRectangle.x = activeRectangle.x;
      debugRectangle.y = activeRectangle.y;
      debugRectangle.width = activeRectangle.width;
      debugRectangle.height = activeRectangle.height;
    })
  }

  private disableHitboxes(entity: T) {
    entity.rectanglePool = [...entity.rectanglePool, ...entity.activeRectangles];
    entity.activeRectangles = [];

    entity.debugRectangles.forEach(r => r.visible = false);
  }

  private getAvailableRectangle(entity: T) {
    let rectangle = entity.rectanglePool.pop();
    if (rectangle == null) {
      rectangle = new Phaser.Geom.Rectangle(0, 0, 0, 0);
      if (entity.debug) {
        entity.debugRectangles.push(this.scene.add.rectangle(0, 0, 0, 0, entity.debugColor, 0.5));
      }
    }

    entity.activeRectangles.push(rectangle);
    return rectangle;
  }

  private setRectangleHitbox(entity: T, hitbox: Systems.HasHurtboxes.Shape) {
    const rectangle = this.getAvailableRectangle(entity);

    const scaleX = entity.sprite.scaleX;
    const scaleY = entity.sprite.scaleY;

    const offsetX = entity.sprite.flipX ? hitbox.x * -1 : hitbox.x;
    const offsetY = entity.sprite.flipY ? hitbox.y * -1 : hitbox.y;

    const width = scaleX * hitbox.width;
    const height = scaleY * hitbox.height;
    const x = (entity.sprite.x + (offsetX * scaleX)) - (width * entity.sprite.originX);
    const y = (entity.sprite.y + (offsetY * scaleY)) - (height * entity.sprite.originY);

    rectangle.x = x;
    rectangle.y = y;
    rectangle.width = width;
    rectangle.height = height;
  }
}
