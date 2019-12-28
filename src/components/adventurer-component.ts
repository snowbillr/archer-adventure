import { BaseScene } from "../scenes/base-scene";
import { PERSISTENCE_KEYS } from "../constants/persistence-keys";

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
