import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { InteractionCircleComponent } from '../../../components/interaction-circle-component';
import { BaseScene } from '../../../scenes/base-scene';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { movementAttributes } from '../movement-attributes';
import { AdventurerComponent } from '../../../components/adventurer-component';
import { SceneComponent } from '../../../components/scene-component';

export const trackAdventurer: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-track-adventurer',
  onEnter(enemy) {
    enemy.getComponent(SpriteComponent).sprite.anims.play('enemy-jump');
  },
  onUpdate(enemy) {
    const scene = enemy.getComponent(SceneComponent).scene as BaseScene;

    const adventurer = scene.phecs.phEntities.getEntitiesByComponent(AdventurerComponent)[0];
    const adventurerSprite = adventurer.getComponent(SpriteComponent).sprite;

    const enemySprite = enemy.getComponent(SpriteComponent).sprite;
    const enemyBody = enemy.getComponent(PhysicsBodyComponent).body;

    if (enemySprite.x < adventurerSprite.x) {
      enemyBody.velocity.x = movementAttributes.trackingVelocity;
      enemySprite.flipX = false;
    } else if (enemySprite.x > adventurerSprite.x) {
      enemyBody.velocity.x = -movementAttributes.trackingVelocity;
      enemySprite.flipX = true;
    }
  },
  transitions: [
    {
      type: TransitionType.Timer,
      delay: 1000,
      to: 'enemy-jump-prep',
    },
    {
      type: TransitionType.Conditional,
      condition(enemy) {
        const scene = enemy.getComponent(SceneComponent).scene as BaseScene;
        const activeEntityIds = enemy.getComponent(InteractionCircleComponent).interactionTracker.getEntityIds('active');

        const adventurerId = scene.phecs.phEntities.getEntitiesByComponent(AdventurerComponent)[0].id;

        return !activeEntityIds.includes(adventurerId);
      },
      to: 'enemy-idle',
    }
  ],
}
