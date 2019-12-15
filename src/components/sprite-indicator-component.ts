import { SpriteComponent } from './sprite-component';
import { Indicator, IndicatorSide } from '../lib/indicator';

export class SpriteIndicatorComponent implements Phecs.Component {
  public indicator: Indicator;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    const indicatorSide: IndicatorSide = data.indicatorSide || IndicatorSide.TOP;
    const sprite = entity.getComponent(SpriteComponent).sprite;

    this.indicator = new Indicator(scene, sprite, indicatorSide);
    this.indicator.hide();
  }

  destroy() {
    this.indicator.destroy();
  }
}
