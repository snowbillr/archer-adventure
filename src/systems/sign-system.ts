import { IndicatorComponent } from '../components/indicator-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';
import { TextboxComponent } from '../components/textbox-component';

export class SignSystem implements SystemsManager.System {
  static SystemTags = {
    interactor: 'sign-interactor',
    sign: 'sign-interactive',
  }

  start(systemsManager: SystemsManager.SystemsManager) {
    const adventurer: Phecs.Entity = systemsManager.getEntities(AdventurerComponent.tag)[0];
    const signs: Systems.SignSystem.SignEntity[] = systemsManager.getEntities('sign');

    signs.forEach(sign => {
      const controlKey = adventurer.components[AdventurerComponent.tag].controls[sign.components[InteractionCircleComponent.tag].interactionControl];

      controlKey.on(Phaser.Input.Keyboard.Events.DOWN, () => {
        const activeInteractionIds = sign.components[InteractionCircleComponent.tag].interactionTracker.getEntityIds('active');
        if (activeInteractionIds.includes(adventurer.id)) {
          if (sign.isTextboxShowing) {
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

  update(systemsManager: SystemsManager.SystemsManager) {
    const adventurer: Phecs.Entity = systemsManager.getEntities(SignSystem.SystemTags.interactor)[0];
    const signs: Systems.SignSystem.SignEntity[] = systemsManager.getEntities('sign');

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
