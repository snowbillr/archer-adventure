import { Boundable } from '../components/boundable';
import { PhysicallyRenderable } from '../components/physically-renderable';

export class TestAdventurer implements PhysicallyRenderable.Entity {
  public sprite!: Phaser.GameObjects.Sprite;
  public body!: Phaser.Physics.Arcade.Body;
  public boundable!: Boundable.Component;

  create(scene: Phaser.Scene) {
    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.update());

    const renderable = new PhysicallyRenderable(scene, 100, 100, 'adventurer-core');
    renderable.create();
    this.sprite = renderable.getSprite();
    this.sprite.setScale(6);
    this.body = renderable.getBody();
    this.body.allowGravity = false;

    this.boundable = new Boundable<TestAdventurer>(scene, this, 'adventurer-bounds');
    this.boundable.create();
  }

  update() {
    this.boundable.update();
  }
}
