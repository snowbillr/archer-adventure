import { BasePersistenceDocument } from "./base-persistence-document";

export class AdventurerDocument extends BasePersistenceDocument {
  public maxHealth!: number;
  public health!: number;

  constructor() {
    super(['maxHealth', 'health']);

    this.reset();
  }

  reset() {
    this.maxHealth = 0;
    this.health = 0;
  }
}