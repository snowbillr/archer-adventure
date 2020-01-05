import { EntityManager } from "../../lib/phecs/entity-manager";
import { InteractionComponent } from "../../components/interaction-component";
import { InteractionTracker } from "../../lib/interaction-tracker";
import { BaseScene } from "../../scenes/base-scene";

export abstract class BaseInteractionSystem implements Phecs.System {
  protected scene: BaseScene;

  private identifierA: Phecs.EntityIdentifier;
  private identifierB: Phecs.EntityIdentifier;
  private listeners: { control: string, listener: () => void, listenerCancelFn: () => void }[]

  protected onEnter?(entityA: Phecs.Entity, entityB: Phecs.Entity): void;
  protected onInteraction?(entityA: Phecs.Entity, interactionEntity: Phecs.Entity): void;
  protected onExit?(entityA: Phecs.Entity, entityB: Phecs.Entity): void;

  constructor(scene: Phaser.Scene, identifierA: Phecs.EntityIdentifier, identifierB: Phecs.EntityIdentifier) {
    this.scene = scene as BaseScene;
    this.identifierA = identifierA;
    this.identifierB = identifierB;

    this.listeners = [];
  }

  start(phEntities: EntityManager) {
    const entityAs = phEntities.getEntities(this.identifierA);
    const entityBs = phEntities.getEntities(this.identifierB);

    this.validateEntities(entityAs);
    this.validateEntities(entityBs);

    const actionControl = this.scene.controls.action;

    for (let entityA of entityAs) {
      for (let entityB of entityBs) {
        const listener = () => {
          const entityAActiveInteractionIds = entityA.getComponent(InteractionComponent).interactionTracker.getEntityIds('active');
          if (entityAActiveInteractionIds.includes(entityB.id)) {
            if (this.onInteraction) {
              this.onInteraction(entityA, entityB);
            }
          }
        } 

        const listenerCancelFn = actionControl.onPress(listener);
        this.listeners.push({ control: 'action', listener: listener, listenerCancelFn });
      }
    }
  }

  stop() {
    for (let listener of this.listeners) {
      listener.listenerCancelFn();
    }
  }

  update(phEntities: EntityManager) {
    const entityAs = phEntities.getEntities(this.identifierA);
    const entityBs = phEntities.getEntities(this.identifierB);

    for (let entityA of entityAs) {
      const entityAInteractionTracker = entityA.getComponent(InteractionComponent).interactionTracker; 

      const enteringEntityBs = this.getInteractingEntityBs(entityAInteractionTracker, entityBs, 'entering');
      for (let enteringEntityB of enteringEntityBs) {
        if (this.onEnter) {
          this.onEnter(entityA, enteringEntityB);
        }
      }

      const exitingEntityBs = this.getInteractingEntityBs(entityAInteractionTracker, entityBs, 'exiting');
      for (let exitingEntityB of exitingEntityBs) {
        if (this.onExit) {
          this.onExit(entityA, exitingEntityB);
        }
      }
    }
  }

  destroy() {
    this.listeners = [];
  }

  private validateEntities(entities: Phecs.Entity[]) {
    if(!entities.every(entity => entity.hasComponent(InteractionComponent))) {
      throw new Error('BaseInteractionSystem::ENTITY_MISSING_INTERACTION_COMPONENT');
    }
  }

  private getInteractingEntityBs(interactionTracker: InteractionTracker, entities: Phecs.Entity[], interactionState: InteractionState) {
    const interactingIds = interactionTracker.getEntityIds(interactionState);

    return entities.filter(entityB => interactingIds.includes(entityB.id));
  }
}