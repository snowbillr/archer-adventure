import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { movementAttributes } from '../movement-attributes';
import { InteractionCircleComponent } from '../../../components/interaction-circle-component';
import { SpriteComponent } from '../../../components/sprite-component';
import { BaseScene } from '../../../scenes/base-scene';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const wander: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-wander',
  onEnter(enemy) {
    const sprite = enemy.components[SpriteComponent.tag].sprite;
    const body = enemy.components[PhysicsBodyComponent.tag].body;
    body.velocity.x = Phaser.Math.RND.pick([-1, 1]) * movementAttributes.wanderVelocity;

    if (body.velocity.x < 0) {
      sprite.flipX = true;
    } else {
      sprite.flipX = false;
    }
  },
  transitions: [
    {
      type: TransitionType.Timer,
      delay: () => Phaser.Math.RND.between(500, 1500),
      to(enemy) {
        return Phaser.Math.RND.pick(['enemy-wander', 'enemy-idle']);
      }
    },
    {
      type: TransitionType.Conditional,
      condition(enemy) {
        const activeEntityIds = enemy.components[InteractionCircleComponent.tag].interactionTracker.getEntityIds('active');

        // This is gross and there has to be a better way to get at Phecs
        const scene = enemy.components[SpriteComponent.tag].sprite.scene as BaseScene;
        for (let entityId of activeEntityIds) {
          const entity = scene.phecs.phEntities.getEntityById(entityId);
          if (entity && entity.components[AdventurerComponent.tag]) {
            return true;
          }
        }

        return false;
      },
      to: 'enemy-track-adventurer'
    }
  ],
}
