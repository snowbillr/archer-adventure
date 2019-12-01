import { IndicatorComponent } from '../components/indicator-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';
import { TextboxComponent } from '../components/textbox-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class SignSystem implements Phecs.System {
  private listeners: (() => void)[];

  constructor() {
    this.listeners = [];
  }

  start(phEntities: EntityManager) {
    const adventurer = phEntities.getEntitiesByTag(AdventurerComponent.tag)[0];
    const signs = phEntities.getEntitiesByTag('sign');

    signs.forEach(sign => {
      const controlKey = adventurer.components[AdventurerComponent.tag].controls[sign.components[InteractionCircleComponent.tag].interactionControl];

      const listener = () => {
        const activeInteractionIds = sign.components[InteractionCircleComponent.tag].interactionTracker.getEntityIds('active');
        if (activeInteractionIds.includes(adventurer.id)) {
          if (sign.components[TextboxComponent.tag].isTextboxShowing) {
            sign.components[TextboxComponent.tag].hideTextbox();
            sign.components[IndicatorComponent.tag].showIndicator();
          } else {
            sign.components[TextboxComponent.tag].showTextbox();
            sign.components[IndicatorComponent.tag].hideIndicator();
          }
        }
      };

      this.listeners.push(listener)
      controlKey.on(Phaser.Input.Keyboard.Events.DOWN, listener);
    });
  }

  stop(phEntities: EntityManager) {
    const adventurer = phEntities.getEntitiesByTag(AdventurerComponent.tag)[0];
    const signs = phEntities.getEntitiesByTag('sign');

    const controlKeys = new Set(signs.map(sign => adventurer.components[AdventurerComponent.tag].controls[sign.components[InteractionCircleComponent.tag].interactionControl]));

    this.listeners.forEach(listener => {
      controlKeys.forEach(controlKey => {
        controlKey.off(Phaser.Input.Keyboard.Events.DOWN, listener);
      });
    });

    this.listeners = [];
  }

  update(phEntities: EntityManager) {
    const adventurer = phEntities.getEntitiesByTag(AdventurerComponent.tag)[0];
    const signs = phEntities.getEntitiesByTag('sign');

    const enteringSignIds = adventurer.components[InteractionCircleComponent.tag].interactionTracker.getEntityIds('entering');
    const enteringSigns = signs.filter(sign => enteringSignIds.includes(sign.id));
    for (let enteringSign of enteringSigns) {
      enteringSign.components[IndicatorComponent.tag].showIndicator();
    }

    const exitingSignIds = adventurer.components[InteractionCircleComponent.tag].interactionTracker.getEntityIds('exiting');
    const exitingSigns = signs.filter(sign => exitingSignIds.includes(sign.id));
    for (let exitingSign of exitingSigns) {
      exitingSign.components[IndicatorComponent.tag].hideIndicator();

      if (exitingSign.components[TextboxComponent.tag].isTextboxShowing) {
        exitingSign.components[TextboxComponent.tag].hideTextbox();
      }
    }
  }
}
