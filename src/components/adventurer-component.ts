import { BaseScene } from "../scenes/base-scene";

export class AdventurerComponent implements Phecs.Component {
  private scene: BaseScene;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.scene = scene as BaseScene;
  }

  decreaseHealth(amount: number) {
    this.scene.persistence.adventurer.health -= amount;
  }

  destroy() {}
}
