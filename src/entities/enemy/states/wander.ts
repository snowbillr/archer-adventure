import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { movementAttributes } from '../movement-attributes';
import { InteractionCircleComponent } from '../../../components/interaction-circle-component';
import { SpriteComponent } from '../../../components/sprite-component';
import { BaseScene } from '../../../scenes/base-scene';
import { AdventurerComponent } from '../../../components/adventurer-component';
import { ZoneBoundaryComponent } from '../../../components/zone-boundary-component';

export const wander: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-wander',
  onEnter(enemy) {
    const sprite = enemy.getComponent(SpriteComponent).sprite;
    const body = enemy.getComponent(PhysicsBodyComponent).body;
    body.velocity.x = Phaser.Math.RND.pick([-1, 1]) * movementAttributes.wanderVelocity;

    if (body.velocity.x < 0) {
      sprite.flipX = true;
    } else {
      sprite.flipX = false;
    }
  },
  onUpdate(enemy) {
    const sprite = enemy.getComponent(SpriteComponent).sprite as Phaser.GameObjects.Sprite;
    const body = enemy.getComponent(PhysicsBodyComponent).body;
    const zone = enemy.getComponent(ZoneBoundaryComponent).zone;

    if (!Phaser.Geom.Rectangle.ContainsRect(zone, sprite.getBounds())) {
      body.velocity.x *= -1;
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
        const activeEntityIds = enemy.getComponent(InteractionCircleComponent).interactionTracker.getEntityIds('active');

        // This is gross and there has to be a better way to get at Phecs
        const scene = enemy.getComponent(SpriteComponent).sprite.scene as BaseScene;
        for (let entityId of activeEntityIds) {
          const entity = scene.phecs.phEntities.getEntityById(entityId);
          if (entity.hasComponent(AdventurerComponent)) {
            return true;
          }
        }

        return false;
      },
      to: 'enemy-track-adventurer'
    }
  ],
}
