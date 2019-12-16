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
    const adventurer = phEntities.getEntities(AdventurerComponent)[0];
    const signs = phEntities.getEntities('sign');

    signs.forEach(sign => {
      const controlKey = adventurer.getComponent(AdventurerComponent).controls[sign.getComponent(InteractionCircleComponent).interactionControl];

      const listener = () => {
        const activeInteractionIds = sign.getComponent(InteractionCircleComponent).interactionTracker.getEntityIds('active');
        if (activeInteractionIds.includes(adventurer.id)) {
          if (sign.getComponent(TextboxComponent).isTextboxShowing) {
            sign.getComponent(TextboxComponent).hideTextbox();
          } else {
            sign.getComponent(TextboxComponent).showTextbox();
          }
        }
      };

      this.listeners.push(listener)
      controlKey.on(Phaser.Input.Keyboard.Events.DOWN, listener);
    });
  }

  stop(phEntities: EntityManager) {
    const adventurer = phEntities.getEntities(AdventurerComponent)[0];
    const signs = phEntities.getEntities('sign');

    const controlKeys = new Set(signs.map(sign => adventurer.getComponent(AdventurerComponent).controls[sign.getComponent(InteractionCircleComponent).interactionControl]));

    this.listeners.forEach(listener => {
      controlKeys.forEach(controlKey => {
        controlKey.off(Phaser.Input.Keyboard.Events.DOWN, listener);
      });
    });

    this.listeners = [];
  }
}
