import { TextComponent } from './text-component';
import { Indicator, IndicatorSide } from '../lib/indicator';

export class TextIndicatorComponent implements Phecs.Component {
  public indicator: Indicator;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    const indicatorSide: IndicatorSide = data.indicatorSide || IndicatorSide.TOP;
    const text = entity.getComponent(TextComponent).bitmapText;

    this.indicator = new Indicator(scene, text, indicatorSide);
    this.indicator.hide();
  }

  destroy() {
    this.indicator.destroy();
  }
}
