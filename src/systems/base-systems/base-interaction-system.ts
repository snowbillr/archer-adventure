import { EntityManager } from "../../lib/phecs/entity-manager";
import { AdventurerComponent } from "../../components/adventurer-component";
import { InteractionCircleComponent } from "../../components/interaction-circle-component";
import { InteractionTracker } from "../../lib/interaction-tracker";
import { BaseScene } from "../../scenes/base-scene";

export abstract class BaseInteractionSystem implements Phecs.System {
  private scene: BaseScene;

  private identifierA: Phecs.EntityIdentifier;
  private identifierB: Phecs.EntityIdentifier;
  private listeners: { control: string, listener: () => void, listenerCancelFn: () => void }[]

  protected onEnter?(entityB: Phecs.Entity): void;
  protected onInteraction?(interactionEntity: Phecs.Entity): void;
  protected onExit?(entityB: Phecs.Entity): void;

  constructor(scene: Phaser.Scene, identifierA: Phecs.EntityIdentifier, identifierB: Phecs.EntityIdentifier) {
    this.scene = scene as BaseScene;
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

      const controls = this.scene.controls;

      for (let interactionEntity of interactionEntities) {
        const interactionControl = controls.action;

        const listener = () => {
          const activeInteractionIds = interactionEntity.getComponent(InteractionCircleComponent).interactionTracker.getEntityIds('active');
          if (activeInteractionIds.includes(controlEntity.id)) {
            if (this.onInteraction) {
              this.onInteraction(interactionEntity);
            }
          }
        } 

        const listenerCancelFn = interactionControl.onPress(listener);
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