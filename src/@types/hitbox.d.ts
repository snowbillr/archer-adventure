declare namespace Hitbox {
  interface Component {
    create(): void;
    update(): void;
  }

  interface Entity {

  }

  type HitboxFrame = {
    key: string;
    frame: number | string;
    hitboxes: HitboxConfig[];
  }

  type HitboxConfig = {
    type: "rectangle";
    x: number;
    y: number;
    height: number;
    width: number;
  }
}
