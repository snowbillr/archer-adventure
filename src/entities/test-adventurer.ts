import { Hitboxes } from '../components/hitbox';
import { Renderable } from '../components/renderable';

export class TestAdventurer implements Renderable.Entity {
  public sprite!: Phaser.GameObjects.Sprite;
  private hitboxes!: Hitboxes<TestAdventurer>;

  create(scene: Phaser.Scene) {
    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.update());

    const renderable = new Renderable(scene, 100, 100, 'adventurer-core');
    renderable.create();
    this.sprite = renderable.getSprite();
    this.sprite.setScale(3);

    this.hitboxes = new Hitboxes<TestAdventurer>(scene, this, 'adventurer-hitboxes', true);
    this.hitboxes.create();
  }

  update() {
    this.hitboxes.update();
  }
}
