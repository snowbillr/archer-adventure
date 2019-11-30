import { SpriteComponent } from './sprite-component';

export class IndicatorComponent implements Phecs.Component {
  public static tag: string = 'indicator';

  public indicatorSprite: Phaser.GameObjects.Sprite;
  public showIndicator: () => void;
  public hideIndicator: () => void;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    let { x, y } = data;
    y = y - entity.components[SpriteComponent.tag].sprite.displayHeight - 20;

    const indicatorSprite = scene.add.sprite(x, y, 'indicator-down');

    function showIndicator() {
      indicatorSprite.visible = true;
      indicatorSprite.active = true;
      indicatorSprite.anims.play('indicator-down');
    }

    function hideIndicator() {
      indicatorSprite.visible = false;
      indicatorSprite.active = false;
      indicatorSprite.anims.stop();
    }

    this.indicatorSprite = indicatorSprite;
    this.showIndicator = showIndicator;
    this.hideIndicator = hideIndicator;

    hideIndicator();
  }

  destroy() {
    this.indicatorSprite.destroy();

    delete this.indicatorSprite;
    delete this.showIndicator;
    delete this.hideIndicator;
  }
}
