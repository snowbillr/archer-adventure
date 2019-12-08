import { BaseScene } from '../scenes/base-scene';

export class ZoneBoundaryComponent implements Phecs.Component {
  public zone: Phaser.Geom.Rectangle;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    const baseScene = scene as BaseScene;

    const rawZone = baseScene.areaManager.getZone(data.zoneBoundaryName);

    if (rawZone == null) {
      throw new Error('ZoneBoundaryComponent::ZONE_NOT_FOUND');
    } else {
      this.zone = new Phaser.Geom.Rectangle(rawZone.x, rawZone.y, rawZone.width, rawZone.height);
    }
  }

  destroy() {
    delete this.zone;
  }
}
