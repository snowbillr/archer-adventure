import { SpriteComponent } from './sprite-component';

export class PhysicsBodyComponent implements Phecs.Component {
  public body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    scene.physics.add.existing(entity.getComponent(SpriteComponent).sprite) as Phaser.Physics.Arcade.Sprite;

    // The sheep had a weird scaling issue where the body wasn't the same size as the sprite.
    // It was being set to the pre-scaled size instead.
    // So there's some code here that manually syncs it up.
    const sprite = entity.getComponent(SpriteComponent).sprite;
    this.body = sprite.body as Phaser.Physics.Arcade.Body;

    this.body.setSize(sprite.width, sprite.height);
    this.body.updateBounds();

    if (data.maxVelocityX) {
      this.body.maxVelocity.x = data.maxVelocityX;
    }

    if (data.collideWorldBounds) {
      this.body.collideWorldBounds = true;
    }
  }

  destroy() {
    this.body.destroy();

    delete this.body;
  }
}
