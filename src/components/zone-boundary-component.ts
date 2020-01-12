import { BaseScene } from '../scenes/base-scene';

export class ZoneBoundaryComponent implements Phecs.Component {
  public zone: Phaser.Geom.Rectangle;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    const baseScene = scene as BaseScene;

    const zone = baseScene.areaManager.getZone(data.zoneBoundaryName);

    if (zone == null) {
      throw new Error('ZoneBoundaryComponent::ZONE_NOT_FOUND');
    } else {
      this.zone = zone.shape;
    }
  }

  destroy() {
    delete this.zone;
  }
}
