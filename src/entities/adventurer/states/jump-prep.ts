import { movementAttributes } from '../movement-attributes';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerJumpPrep: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'adventurer-jump-prep',
  onEnter(entity: Phecs.Entity) {
    entity.components[PhysicsBodyComponent.tag].body.acceleration.x = 0;

    entity.components[SpriteComponent.tag].sprite.anims.play('adventurer-jump-prep');
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Phecs.Entity) => {
        return !entity.components[SpriteComponent.tag].sprite.anims.isPlaying;
      },
      to: (entity: Phecs.Entity) => {
        const controls = entity.components[AdventurerComponent.tag].controls;

        if (controls.right.isDown) {
          return 'adventurer-jump-right';
        } else if (controls.left.isDown) {
          return 'adventurer-jump-left';
        } else if (entity.components[PhysicsBodyComponent.tag].body.velocity.x > 0) {
          return 'adventurer-jump-right';
        } else if (entity.components[PhysicsBodyComponent.tag].body.velocity.x < 0) {
          return 'adventurer-jump-left';
        } else {
          return 'adventurer-jump';
        }
      },
      onTransition: (entity: Phecs.Entity) => {
        if (entity.components[AdventurerComponent.tag].controls.up.isDown) {
          entity.components[PhysicsBodyComponent.tag].body.velocity.y = movementAttributes.jumpVelocity;
        } else {
          entity.components[PhysicsBodyComponent.tag].body.velocity.y = movementAttributes.shortJumpVelocity;
        }
      },
    }
  ]
}
