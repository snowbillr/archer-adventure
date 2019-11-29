export class AreaBoundaryComponent implements Phecs.Component {
  public static tag: string = 'area-boundary';

  public areaBoundary: { left: number, right: number };

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.areaBoundary = {
      left: data.areaBoundaryLeft,
      right: data.areaBoundaryRight
    };
  }

  destroy() {
    delete this.areaBoundary;
  }
}
