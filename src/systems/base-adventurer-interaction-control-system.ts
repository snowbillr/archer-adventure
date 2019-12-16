import { EntityManager } from "../lib/phecs/entity-manager";
import { AdventurerComponent } from "../components/adventurer-component";
import { InteractionCircleComponent } from "../components/interaction-circle-component";

export abstract class BaseAdventurerInteractionControlSystem implements Phecs.System {
  private interactionIdentifier: Phecs.EntityIdentifier;

  private listeners: (() => void)[];

  constructor(interactionIdentifier: Phecs.EntityIdentifier) {
    this.interactionIdentifier = interactionIdentifier;

    this.listeners = [];
  }

  start(phEntities: EntityManager) {
    const adventurer = phEntities.getEntities(AdventurerComponent)[0];
    if (!adventurer) return;

    const interactionEntities = phEntities.getEntities(this.interactionIdentifier);

    const adventurerControls = adventurer.getComponent(AdventurerComponent).controls;

    for (let interactionEntity of interactionEntities) {
      const interactionControl = adventurerControls[interactionEntity.getComponent(InteractionCircleComponent).interactionControl];

      const listener = () => {
        const activeInteractionIds = interactionEntity.getComponent(InteractionCircleComponent).interactionTracker.getEntityIds('active');
        if (activeInteractionIds.includes(adventurer.id)) {
          this.onInteraction(interactionEntity);
        }
      } 

      interactionControl.on(Phaser.Input.Keyboard.Events.DOWN, listener);
      this.listeners.push(listener);
    }
  }

  stop(phEntities: EntityManager) {
    const adventurer = phEntities.getEntities(AdventurerComponent)[0];
    if (!adventurer) return;

    const interactionEntities = phEntities.getEntities(this.interactionIdentifier);

    const adventurerControls = adventurer.getComponent(AdventurerComponent).controls;

    for (let interactionEntity of interactionEntities) {
      const interactionControl = adventurerControls[interactionEntity.getComponent(InteractionCircleComponent).interactionControl];

      for (let listener of this.listeners) {
        interactionControl.off(Phaser.Input.Keyboard.Events.DOWN, listener);
      }
    }
  }

  destroy() {
    this.listeners = [];
  }

  protected abstract onInteraction(interactionEntity: Phecs.Entity): void;
}
