import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { InteractionCircleComponent } from '../../../components/interaction-circle-component';
import { BaseScene } from '../../../scenes/base-scene';
import { AdventurerComponent } from '../../../components/adventurer-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const idle: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-idle',
  onEnter(enemy) {
    const body = enemy.getComponent(PhysicsBodyComponent).body;
    body.velocity.x = 0;

    enemy.getComponent(SpriteComponent).sprite.anims.play('enemy-idle');
  },
  transitions: [
    {
      type: TransitionType.Timer,
      delay: () => Phaser.Math.RND.between(500, 1500),
      to() {
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
          if (entity && entity.getComponent(AdventurerComponent)) {
            return true;
          }
        }

        return false;
      },
      to: 'enemy-track-adventurer'
    }
  ],
}
