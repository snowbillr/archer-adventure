import { PhiniteState } from '../../components/phinite-state';

import { states } from './states';

export class Adventurer {
  public sprite!: Phaser.Physics.Arcade.Sprite;
  public body!: Phaser.Physics.Arcade.Body;

  public phiniteState!: PhiniteState<Adventurer>;

  create(scene: Phaser.Scene) {
    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.update());

    this.phiniteState = new PhiniteState<Adventurer>(scene, this, states, <PhiniteState.State<Adventurer>> states.find(s => s.id === 'adventurer-stand'));
    this.phiniteState.create();
  }

  update() {
    this.phiniteState.update();
  }
}
