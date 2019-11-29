import { SpriteComponent } from './sprite-component';

export class PhysicsBodyComponent implements Phecs.Component {
  public static tag: string = 'physics-body';

  public body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    scene.physics.add.existing(entity.components[SpriteComponent.tag].sprite) as Phaser.Physics.Arcade.Sprite;

    // The sheep had a weird scaling issue where the body wasn't the same size as the sprite.
    // It was being set to the pre-scaled size instead.
    // So there's some code here that manually syncs it up.
    const sprite = entity.components[SpriteComponent.tag].sprite;
    sprite.body.setSize(sprite.width, sprite.height);
    sprite.body.updateBounds();

    this.body = sprite.body as Phaser.Physics.Arcade.Body;

    if (data.maxVelocityX) {
      this.body.maxVelocity.x = data.maxVelocityX;
    }
  }

  destroy() {
    this.body.destroy();

    delete this.body;
  }
}
