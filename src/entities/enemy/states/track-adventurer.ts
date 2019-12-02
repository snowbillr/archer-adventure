import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { InteractionCircleComponent } from '../../../components/interaction-circle-component';
import { BaseScene } from '../../../scenes/base-scene';
import { AdventurerComponent } from '../../../components/adventurer-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { movementAttributes } from '../movement-attributes';

export const trackAdventurer: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-track-adventurer',
  onEnter(enemy) {
    enemy.components[SpriteComponent.tag].sprite.anims.play('enemy-jump');
  },
  onUpdate(enemy) {
    const scene = enemy.components[SpriteComponent.tag].sprite.scene as BaseScene;

    const adventurer = scene.phecs.phEntities.getEntitiesByName('adventurer')[0];
    const adventurerSprite = adventurer.components[SpriteComponent.tag].sprite;

    const enemySprite = enemy.components[SpriteComponent.tag].sprite;
    const enemyBody = enemy.components[PhysicsBodyComponent.tag].body;

    if (enemySprite.x < adventurerSprite.x) {
      enemyBody.velocity.x = movementAttributes.trackingVelocity;
    } else if (enemySprite.x > adventurerSprite.x) {
      enemyBody.velocity.x = -movementAttributes.trackingVelocity;
    }
  },
  transitions: [
    {
      type: TransitionType.Timer,
      delay: 1500,
      to: 'enemy-jump',
    },
    {
      type: TransitionType.Conditional,
      condition(enemy) {
        const activeEntityIds = enemy.components[InteractionCircleComponent.tag].interactionTracker.getEntityIds('active');

        let seesAdventurer = false;

        // This is gross and there has to be a better way to get at Phecs
        const scene = enemy.components[SpriteComponent.tag].sprite.scene as BaseScene;
        for (let entityId of activeEntityIds) {
          const entity = scene.phecs.phEntities.getEntityById(entityId);
          if (entity && entity.components[AdventurerComponent.tag]) {
            seesAdventurer = true;
            break;
          }
        }

        return !seesAdventurer;
      },
      to: 'enemy-idle'
    }
  ],
}
