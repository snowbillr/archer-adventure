import { EntityManager } from "../lib/phecs/entity-manager";
import { AdventurerComponent } from "../components/adventurer-component";
import { InteractionCircleComponent } from "../components/interaction-circle-component";

export abstract class BaseAdventurerInteractionControlSystem implements Phecs.System {
  private controlIdentifier: Phecs.EntityIdentifier;
  private interactionIdentifier: Phecs.EntityIdentifier;

  private listeners: (() => void)[];

  constructor(controlIdentifier: Phecs.EntityIdentifier, interactionIdentifier: Phecs.EntityIdentifier) {
    this.controlIdentifier = controlIdentifier;
    this.interactionIdentifier = interactionIdentifier;

    this.listeners = [];
  }

  start(phEntities: EntityManager) {
    const controlEntities = phEntities.getEntities(this.controlIdentifier);
    const interactionEntities = phEntities.getEntities(this.interactionIdentifier);

    for (let controlEntity of controlEntities) {
      const controlEntityControls = controlEntity.getComponent(AdventurerComponent).controls;

      for (let interactionEntity of interactionEntities) {
        const interactionControl = controlEntityControls[interactionEntity.getComponent(InteractionCircleComponent).interactionControl];

        const listener = () => {
          const activeInteractionIds = interactionEntity.getComponent(InteractionCircleComponent).interactionTracker.getEntityIds('active');
          if (activeInteractionIds.includes(controlEntity.id)) {
            this.onInteraction(interactionEntity);
          }
        } 

        interactionControl.on(Phaser.Input.Keyboard.Events.DOWN, listener);
        this.listeners.push(listener);
      }
    }
  }

  stop(phEntities: EntityManager) {
    const controlEntities = phEntities.getEntities(this.controlIdentifier);
    const interactionEntities = phEntities.getEntities(this.interactionIdentifier);

    for (let controlEntity of controlEntities) {
      const controlEntityControls = controlEntity.getComponent(AdventurerComponent).controls;

      for (let interactionEntity of interactionEntities) {
        const interactionControl = controlEntityControls[interactionEntity.getComponent(InteractionCircleComponent).interactionControl];

        for (let listener of this.listeners) {
          interactionControl.off(Phaser.Input.Keyboard.Events.DOWN, listener);
        }
      }
    }
  }

  destroy() {
    this.listeners = [];
  }

  protected abstract onInteraction(interactionEntity: Phecs.Entity): void;
}
