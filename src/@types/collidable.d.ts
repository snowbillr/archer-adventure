declare namespace Collidable {
  interface Component {
    create(): void;
    update(): void;

    collide(arcadeObject: Phaser.Types.Physics.Arcade.ArcadeColliderType): void;
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
