import { movementAttributes } from '../movement-attributes';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { SceneComponent } from '../../../components/scene-component';
import { BaseScene } from '../../../scenes/base-scene';

export const adventurerJumpPrep: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'adventurer-jump-prep',
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(PhysicsBodyComponent).body.acceleration.x = 0;

    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-jump-prep');
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Phecs.Entity) => {
        return !entity.getComponent(SpriteComponent).sprite.anims.isPlaying;
      },
      to: (entity: Phecs.Entity) => {
        const controls = (entity.getComponent(SceneComponent).scene as BaseScene).controls;

        if (controls.right.isPressed) {
          return 'adventurer-jump-right';
        } else if (controls.left.isPressed) {
          return 'adventurer-jump-left';
        } else if (entity.getComponent(PhysicsBodyComponent).body.velocity.x > 0) {
          return 'adventurer-jump-right';
        } else if (entity.getComponent(PhysicsBodyComponent).body.velocity.x < 0) {
          return 'adventurer-jump-left';
        } else {
          return 'adventurer-jump';
        }
      },
      onTransition: (entity: Phecs.Entity) => {
        const controls = (entity.getComponent(SceneComponent).scene as BaseScene).controls;

        if (controls.up.isPressed) {
          entity.getComponent(PhysicsBodyComponent).body.velocity.y = movementAttributes.jumpVelocity;
        } else {
          entity.getComponent(PhysicsBodyComponent).body.velocity.y = movementAttributes.shortJumpVelocity;
        }
      },
    }
  ]
}
