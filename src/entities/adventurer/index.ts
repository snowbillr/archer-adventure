import { PhiniteState } from '../../components/phinite-state';
import { PhysicallyRenderable } from '../../components/physically-renderable';
import { Controlable } from '../../components/controlable';
import { Hitboxes } from '../../components/hitboxes';

import { states } from './states';
import { movementAttributes } from './movement-attributes';

export class Adventurer implements PhysicallyRenderable.Entity, Controlable.Entity {
  public sprite!: Phaser.Physics.Arcade.Sprite;
  public body!: Phaser.Physics.Arcade.Body;

  public controls!: Controlable.Controls;

  public phiniteState!: PhiniteState<Adventurer>;

  private hitboxes!: Hitboxes<Adventurer>;

  create(scene: Phaser.Scene) {
    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.update());

    const physicallyRenderable = new PhysicallyRenderable(scene, 100, 100, 'adventurer-core');
    physicallyRenderable.create();
    this.sprite = physicallyRenderable.getSprite();
    this.sprite.setScale(2);
    this.body = physicallyRenderable.getBody();
    this.body.maxVelocity.x = movementAttributes.maxVelocity;
    this.body.setSize(25, 32);
    this.body.setOffset(12, 5);

    const controlable = new Controlable(scene);
    controlable.create();
    this.controls = controlable.getControls();

    this.phiniteState = new PhiniteState<Adventurer>(scene, this, states, <PhiniteState.State<Adventurer>> states.find(s => s.id === 'adventurer-stand'));
    this.phiniteState.create();

    this.hitboxes = new Hitboxes<Adventurer>(scene, this, 'adventurer-hitboxes', true);
    this.hitboxes.create();
  }

  update() {
    this.phiniteState.update();
    this.hitboxes.update();
  }
}
