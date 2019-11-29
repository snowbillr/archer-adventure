import { IndicatorComponent } from '../components/indicator-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';
import { TextboxComponent } from '../components/textbox-component';
import { EntityManager } from '../lib/phecs/entity-manager';

export class SignSystem implements Phecs.System {
  static SystemTags = {
    interactor: 'sign-interactor',
    sign: 'sign-interactive',
  }

  start(phEntities: EntityManager) {
    const adventurer: Phecs.Entity = phEntities.getEntitiesByTag(AdventurerComponent.tag)[0];
    const signs: Systems.SignSystem.SignEntity[] = phEntities.getEntitiesByTag('sign');

    signs.forEach(sign => {
      const controlKey = adventurer.components[AdventurerComponent.tag].controls[sign.components[InteractionCircleComponent.tag].interactionControl];

      controlKey.on(Phaser.Input.Keyboard.Events.DOWN, () => {
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
      });
    });
  }

  update(phEntities: EntityManager) {
    const adventurer: Phecs.Entity = phEntities.getEntitiesByTag(SignSystem.SystemTags.interactor)[0];
    const signs: Systems.SignSystem.SignEntity[] = phEntities.getEntitiesByTag('sign');

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
