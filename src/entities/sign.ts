import 'phaser';
import { Renderable } from '../components/renderable';
import { Interactable } from '../components/interactable';

export class Sign implements Renderable.Entity, Interactable.Entity {
  public interactionCircle!: Phaser.Geom.Circle;
  public sprite!: Phaser.GameObjects.Sprite;

  private interactable!: Interactable.Component;

  create(scene: Phaser.Scene, x: number, y: number, key: string, frame: (string | number)) {
    const renderable = new Renderable(scene, x, y, key, frame);
    renderable.create();
    this.sprite = renderable.getSprite();
    this.sprite.setScale(2);

    this.interactable = new Interactable(scene, this, 30);
    this.interactable.create();
    this.interactionCircle = this.interactable.getInteractionCircle();
  }

  update() {
    this.interactable.update();
  }
}
