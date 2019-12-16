import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';
import { EntityManager } from '../lib/phecs/entity-manager';

type ComponentIdentifierType = Phecs.ComponentConstructor | string;

// This always checks for B entering/exiting A

export abstract class BaseInteractionIndicatorSystem implements Phecs.System {
  private componentA: ComponentIdentifierType;
  private componentB: ComponentIdentifierType;

  protected onEnter?(entityB: Phecs.Entity): void;
  protected onExit?(entityB: Phecs.Entity): void;

  constructor(componentA: ComponentIdentifierType, componentB: ComponentIdentifierType) {
    this.componentA = componentA;
    this.componentB = componentB;
  }

  update(phEntities: EntityManager) {
    const entityAs = this.getEntitiesForComponent(phEntities, this.componentA);
    const entityBs = this.getEntitiesForComponent(phEntities, this.componentB);

    for (let entityA of entityAs) {
      const entityAInteractionTracker = entityA.getComponent(InteractionCircleComponent).interactionTracker; 

      const enteringEntityBs = this.getInteractingEntityBs(entityAInteractionTracker, entityBs, 'entering');
      for (let enteringEntityB of enteringEntityBs) {
        enteringEntityB.getComponent(SpriteIndicatorComponent).indicator.show();

       if (this.onEnter) {
         this.onEnter(enteringEntityB);
       }
      }

      const exitingEntityBs = this.getInteractingEntityBs(entityAInteractionTracker, entityBs, 'exiting');
      for (let exitingEntityB of exitingEntityBs) {
        exitingEntityB.getComponent(SpriteIndicatorComponent).indicator.hide();

       if (this.onExit) {
         this.onExit(exitingEntityB);
       }
      }
    }
  }

  private getEntitiesForComponent(phEntities: EntityManager, component: ComponentIdentifierType) {
    if (typeof component === 'string') {
      return phEntities.getEntitiesByType(component);
    } else if (typeof component === 'function') {
      return phEntities.getEntitiesByComponent(component);
    } else {
      throw new Error(`BaseInteractionIndicatorSystem::BAD_COMPONENT_IDENTIFIER::${component}`);
    }
  }

  private getInteractingEntityBs(interactionTracker: InteractionTracker, entities: Phecs.Entity[], interactionState: InteractionState) {
    const interactingIds = interactionTracker.getEntityIds(interactionState);

    return entities.filter(entityB => interactingIds.includes(entityB.id));
  }
}
