export class HealthComponent implements Phecs.Component {
  public static tag: string = 'health';

  private maxHealth: number;
  private currentHealth: number;
  private onDeathListeners: (() => void)[];
  private onDamageListeners: ((newHealth: number) => void)[];

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.maxHealth = data.maxHealth;
    this.currentHealth = this.maxHealth;

    this.onDeathListeners = [];
    this.onDamageListeners = [];
  }

  decreaseHealth(amount: number) {
    this.currentHealth -= amount;

    if (this.currentHealth <= 0) {
      this.onDeathListeners.forEach(listener => listener());
    } else {
      this.onDamageListeners.forEach(listener => listener(this.currentHealth));
    }
  }

  onDamage(listener: () => void) {
    this.onDamageListeners.push(listener);
  }

  onDeath(listener: () => void) {
    this.onDeathListeners.push(listener);
  }

  destroy() {
    delete this.maxHealth;
    delete this.currentHealth;
    delete this.onDeathListeners;
  }
}
