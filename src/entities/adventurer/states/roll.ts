import { movementAttributes } from '../movement-attributes';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { SceneComponent } from '../../../components/scene-component';
import { BaseScene } from '../../../scenes/base-scene';
import { InvulnerabilityComponent } from '../../../components/invulnerability-component';

export const adventurerRoll: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'adventurer-roll',
  onEnter(adventurer) {
    adventurer.getComponent(SpriteComponent).sprite.anims.play('adventurer-roll')

    const body = adventurer.getComponent(PhysicsBodyComponent).body;

    const scene = adventurer.getComponent(SceneComponent).scene as BaseScene;
    if (scene.controls.left.isPressed) {
      body.velocity.x = -movementAttributes.rollVelocity;
    } else if (scene.controls.right.isPressed) {
      body.velocity.x = movementAttributes.rollVelocity;
    }

    adventurer.getComponent(InvulnerabilityComponent).makeInvulnerable();
  },
  onLeave(adventurer) {
    adventurer.getComponent(InvulnerabilityComponent).makeVulnerable();
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Phecs.Entity) => {
        return !entity.getComponent(SpriteComponent).sprite.anims.isPlaying;
      },
      to: (entity: Phecs.Entity) => {
        const controls = (entity.getComponent(SceneComponent).scene as BaseScene).controls;

        if (controls.left.isPressed) {
          return 'adventurer-run';
        } else if (controls.right.isPressed) {
          return 'adventurer-run';
        } else if (controls.down.isPressed) {
          return 'adventurer-crouch';
        } else {
          return 'adventurer-stand';
        }
      }
    },
    {
      type: TransitionType.PressControl,
      control: 'up',
      to: 'adventurer-jump-prep',
    }
  ],
};
