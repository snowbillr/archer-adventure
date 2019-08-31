import { states } from './states';

export class Adventurer implements Systems.HasControls.Entity {
  public sprite!: Phaser.Physics.Arcade.Sprite;
  public body!: Phaser.Physics.Arcade.Body;

  public controls!: Systems.HasControls.Controls;

  create(scene: Phaser.Scene) {

    // this.phiniteState = new PhiniteState<Adventurer>(scene, this, states, <PhiniteState.State<Adventurer>> states.find(s => s.id === 'adventurer-stand'));
    // this.phiniteState.create();
  }

  update() {
    // this.phiniteState.update();
  }
}
