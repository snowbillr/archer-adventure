import { PhiniteState } from '../../components/phinite-state';
import { PhysicallyRenderable } from '../../components/physically-renderable';
import { Controlable } from '../../components/controlable';

import { states } from './states';
import { movementAttributes } from './movement-attributes';

export class Adventurer implements PhysicallyRenderable.Entity, Controlable.Entity {
  public sprite!: Phaser.Physics.Arcade.Sprite;
  public body!: Phaser.Physics.Arcade.Body;

  public controls!: Controlable.Controls;
  public controlable!: Controlable.Component;

  public phiniteState!: PhiniteState<Adventurer>;

  create(scene: Phaser.Scene) {
    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.update());

    const physicallyRenderable = new PhysicallyRenderable(scene, 200, 200, 'adventurer-core');
    physicallyRenderable.create();
    this.sprite = physicallyRenderable.getSprite();
    this.sprite.setScale(2);
    this.body = physicallyRenderable.getBody();
    this.body.maxVelocity.x = movementAttributes.maxVelocity;

    this.controlable = new Controlable(scene);
    this.controlable.create();
    this.controls = this.controlable.getControls();

    this.phiniteState = new PhiniteState<Adventurer>(scene, this, states, <PhiniteState.State<Adventurer>> states.find(s => s.id === 'adventurer-stand'));
    this.phiniteState.create();
  }

  update() {
    this.phiniteState.update();
  }
}
