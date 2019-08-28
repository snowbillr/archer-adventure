import { PhiniteState } from '../../components/phinite-state';
import { Collidable } from '../../components/collidable';

import { states } from './states';

export class Adventurer {
  public sprite!: Phaser.Physics.Arcade.Sprite;
  public body!: Phaser.Physics.Arcade.Body;

  public phiniteState!: PhiniteState<Adventurer>;

  private hurtboxes!: Collidable.Component;

  create(scene: Phaser.Scene) {
    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.update());

    this.phiniteState = new PhiniteState<Adventurer>(scene, this, states, <PhiniteState.State<Adventurer>> states.find(s => s.id === 'adventurer-stand'));
    this.phiniteState.create();

    // this.hurtboxes = new Collidable<Adventurer>(scene, this, 'adventurer-hitboxes');
    // this.hurtboxes.create();
  }

  update() {
    this.phiniteState.update();
    // this.hurtboxes.update();
  }
}
