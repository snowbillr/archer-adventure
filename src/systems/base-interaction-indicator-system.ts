import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';
import { EntityManager } from '../lib/phecs/entity-manager';

// This always checks for B entering/exiting A

export abstract class BaseInteractionIndicatorSystem implements Phecs.System {
  private componentA: Phecs.EntityIdentifier;
  private componentB: Phecs.EntityIdentifier;

  protected onEnter?(entityB: Phecs.Entity): void;
  protected onExit?(entityB: Phecs.Entity): void;

  constructor(componentA: Phecs.EntityIdentifier, componentB: Phecs.EntityIdentifier) {
    this.componentA = componentA;
    this.componentB = componentB;
  }

  update(phEntities: EntityManager) {
    const entityAs = phEntities.getEntities(this.componentA);
    const entityBs = phEntities.getEntities(this.componentB);

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

  private getInteractingEntityBs(interactionTracker: InteractionTracker, entities: Phecs.Entity[], interactionState: InteractionState) {
    const interactingIds = interactionTracker.getEntityIds(interactionState);

    return entities.filter(entityB => interactingIds.includes(entityB.id));
  }
}
