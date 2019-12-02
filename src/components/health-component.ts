export class HealthComponent implements Phecs.Component {
  public static tag: string = 'health';

  private maxHealth: number;
  private currentHealth: number;
  private listeners: (() => void)[];

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.maxHealth = data.maxHealth;
    this.currentHealth = this.maxHealth;

    this.listeners = [];
  }

  decreaseHealth(amount: number) {
    this.currentHealth -= amount;

    if (this.currentHealth <= 0) {
      this.listeners.forEach(listener => listener());
    }
  }

  onDeath(listener: () => void) {
    this.listeners.push(listener);
  }

  destroy() {
    delete this.maxHealth;
    delete this.currentHealth;
    delete this.listeners;
  }
}
