import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';
import { EntityManager } from '../lib/phecs/entity-manager';

type ComponentIdentifierType = Phecs.ComponentConstructor | string;
type ComponentIdentifierConfig = {
  component: ComponentIdentifierType;
  enterCallback?: (entity: Phecs.Entity) => void;
  exitCallback?: (entity: Phecs.Entity) => void;
};

export abstract class BaseInteractionIndicatorSystem implements Phecs.System {
  private componentAConfig: ComponentIdentifierConfig;
  private componentBConfig: ComponentIdentifierConfig;

  constructor(componentAConfig: ComponentIdentifierConfig, componentBConfig: ComponentIdentifierConfig) {
    this.componentAConfig = componentAConfig;
    this.componentBConfig = componentBConfig;
  }

  update(phEntities: EntityManager) {
    const entityAs = this.getEntitiesForComponent(phEntities, this.componentAConfig.component);
    const entityBs = this.getEntitiesForComponent(phEntities, this.componentBConfig.component);

    for (let entityA of entityAs) {
      const entityAInteractionTracker = entityA.getComponent(InteractionCircleComponent).interactionTracker; 

      const enteringIds = entityAInteractionTracker.getEntityIds('entering');
      const enteringEntityBs = entityBs.filter(entityB => enteringIds.includes(entityB.id));
      for (let enteringEntityB of enteringEntityBs) {
        enteringEntityB.getComponent(SpriteIndicatorComponent).indicator.show();

        if (this.componentAConfig.enterCallback) {
          this.componentAConfig.enterCallback(entityA);
        }
        if (this.componentBConfig.enterCallback) {
          this.componentBConfig.enterCallback(enteringEntityB);
        }
      }

      const exitingIds = entityAInteractionTracker.getEntityIds('exiting');
      const exitingEntityBs = entityBs.filter(entityB => exitingIds.includes(entityB.id));
      for (let exitingEntityB of exitingEntityBs) {
        exitingEntityB.getComponent(SpriteIndicatorComponent).indicator.hide();

        if (this.componentAConfig.exitCallback) {
          this.componentAConfig.exitCallback(entityA);
        }
        if (this.componentBConfig.exitCallback) {
          this.componentBConfig.exitCallback(exitingEntityB);
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
}
