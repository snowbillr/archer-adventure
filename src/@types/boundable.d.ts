declare namespace Boundable {
  interface Component {
    create(): void;
    update(): void;
  }

  interface Entity {

  }

  type BoundableFrame = {
    key: string;
    frame: number | string;
    bounds: BoundableBounds;
  }

  type BoundableBounds = {
    offset: {
      x: number;
      y: number;
    },
    size: {
      width: number;
      height: number;
    }
  }
}
