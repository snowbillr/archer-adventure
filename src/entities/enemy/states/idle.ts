import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { InteractionCircleComponent } from '../../../components/interaction-circle-component';
import { BaseScene } from '../../../scenes/base-scene';
import { AdventurerComponent } from '../../../components/adventurer-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const idle: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-idle',
  onEnter(enemy) {
    const body = enemy.components[PhysicsBodyComponent.tag].body;
    body.velocity.x = 0;

    enemy.components[SpriteComponent.tag].sprite.anims.play('enemy-idle');
  },
  transitions: [
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
