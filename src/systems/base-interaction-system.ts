import { EntityManager } from "../lib/phecs/entity-manager";
import { AdventurerComponent } from "../components/adventurer-component";
import { InteractionCircleComponent } from "../components/interaction-circle-component";
import { SpriteIndicatorComponent } from "../components/sprite-indicator-component";

export abstract class BaseInteractionSystem implements Phecs.System {
  private identifierA: Phecs.EntityIdentifier;
  private identifierB: Phecs.EntityIdentifier;
  private listeners: { key: Phaser.Input.Keyboard.Key, listener: () => void}[]

  protected onEnter?(entityB: Phecs.Entity): void;
  protected onInteraction?(interactionEntity: Phecs.Entity): void;
  protected onExit?(entityB: Phecs.Entity): void;

  constructor(identifierA: Phecs.EntityIdentifier, identifierB: Phecs.EntityIdentifier) {
    this.identifierA = identifierA;
    this.identifierB = identifierB;

    this.listeners = [];
  }

  start(phEntities: EntityManager) {
    const controlEntities = phEntities.getEntities(this.identifierA);
    const interactionEntities = phEntities.getEntities(this.identifierB);

    for (let controlEntity of controlEntities) {
      // AdventurerComponent for now since there isn't a ControlComponent
      if (!controlEntity.hasComponent(AdventurerComponent)) break;

      const controls = controlEntity.getComponent(AdventurerComponent).controls;

      for (let interactionEntity of interactionEntities) {
        const interactionControl = controls[interactionEntity.getComponent(InteractionCircleComponent).interactionControl];

        const listener = () => {
          const activeInteractionIds = interactionEntity.getComponent(InteractionCircleComponent).interactionTracker.getEntityIds('active');
          if (activeInteractionIds.includes(controlEntity.id)) {
            if (this.onInteraction) {
              this.onInteraction(interactionEntity);
            }
          }
        } 

        interactionControl.on(Phaser.Input.Keyboard.Events.DOWN, listener);
        this.listeners.push({ key: interactionControl, listener: listener });
      }
    }
  }

  stop() {
    for (let listener of this.listeners) {
      listener.key.off(Phaser.Input.Keyboard.Events.DOWN, listener.listener);
    }
  }

  update(phEntities: EntityManager) {
    const entityAs = phEntities.getEntities(this.identifierA);
    const entityBs = phEntities.getEntities(this.identifierB);

    for (let entityA of entityAs) {
      const entityAInteractionTracker = entityA.getComponent(InteractionCircleComponent).interactionTracker; 

      const enteringEntityBs = this.getInteractingEntityBs(entityAInteractionTracker, entityBs, 'entering');
      for (let enteringEntityB of enteringEntityBs) {
        if (this.onEnter) {
          this.onEnter(enteringEntityB);
        }
      }

      const exitingEntityBs = this.getInteractingEntityBs(entityAInteractionTracker, entityBs, 'exiting');
      for (let exitingEntityB of exitingEntityBs) {
        if (this.onExit) {
          this.onExit(exitingEntityB);
        }
      }
    }
  }

  destroy() {
    this.listeners = [];
  }

  private getInteractingEntityBs(interactionTracker: InteractionTracker, entities: Phecs.Entity[], interactionState: InteractionState) {
    const interactingIds = interactionTracker.getEntityIds(interactionState);

    return entities.filter(entityB => interactingIds.includes(entityB.id));
  }
}