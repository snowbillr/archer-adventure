import 'phaser';
import { Renderable } from '../components/renderable';
import { Interactable } from '../components/interactable';

export class Sign implements Renderable.Entity, Interactable.Entity {
  public interactionCircle!: Phaser.Geom.Circle;
  public sprite!: Phaser.GameObjects.Sprite;

  private interactable!: Interactable.Component;

  private indicatorSprite!: Phaser.GameObjects.Sprite;

  create(scene: Phaser.Scene, x: number, y: number, key: string, frame: (string | number)) {
    const renderable = new Renderable(scene, x, y, key, frame);
    renderable.create();
    this.sprite = renderable.getSprite();
    this.sprite.setScale(2);

    this.interactable = new Interactable(scene, this, 30);
    this.interactable.create();
    this.interactionCircle = this.interactable.getInteractionCircle();

    this.indicatorSprite = scene.add.sprite(x, y - this.sprite.displayHeight - 5, 'indicator-down');
    this.indicatorSprite.setScale(2);
    this.hideIndicator();
  }

  update() {
    this.interactable.update();
  }

  showIndicator() {
    this.indicatorSprite.visible = true;
    this.indicatorSprite.active = true;
    this.indicatorSprite.anims.play('indicator-down', true);
  }

  hideIndicator() {
    this.indicatorSprite.visible = false;
    this.indicatorSprite.active = false;
    this.indicatorSprite.anims.stop();
  }
}
