import { PhiniteState } from '../../components/phinite-state';
import { Boundable } from '../../components/boundable';
import { Controlable } from '../../components/controlable';
import { Collidable } from '../../components/collidable';
import { Interactable } from '../../components/interactable';
import { PhysicallyRenderable } from '../../components/physically-renderable';

import { states } from './states';
import { movementAttributes } from './movement-attributes';

export class Adventurer implements PhysicallyRenderable.Entity, Controlable.Entity, Interactable.Entity {
  public sprite!: Phaser.Physics.Arcade.Sprite;
  public body!: Phaser.Physics.Arcade.Body;

  public controls!: Controlable.Controls;

  public phiniteState!: PhiniteState<Adventurer>;

  private hurtboxes!: Collidable.Component;

  public boundable!: Boundable.Component;

  private interactable!: Interactable.Component;
  public interactionCircle!: Phaser.Geom.Circle;

  create(scene: Phaser.Scene) {
    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.update());

    const physicallyRenderable = new PhysicallyRenderable(scene, 900, 100, 'adventurer-core');
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

    this.hurtboxes = new Collidable<Adventurer>(scene, this, 'adventurer-hitboxes');
    this.hurtboxes.create();

    this.boundable = new Boundable<Adventurer>(scene, this, 'adventurer-bounds');
    this.boundable.create();

    this.interactable = new Interactable(scene, this, 30);
    this.interactable.create();
    this.interactionCircle = this.interactable.getInteractionCircle();
  }

  update() {
    this.phiniteState.update();
    this.hurtboxes.update();
    this.boundable.update();
    this.interactable.update();
  }
}
