import { TextboxComponent } from '../components/textbox-component';
import { BaseInteractionSystem } from './base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';

export class AdventurerSignSystem extends BaseInteractionSystem {
  constructor() {
    super(AdventurerComponent, 'sign')
  }

  onEnter(sign: Phecs.Entity) {
    sign.getComponent(SpriteIndicatorComponent).indicator.show();
  }

  onInteraction(sign: Phecs.Entity) {
    if (sign.getComponent(TextboxComponent).isTextboxShowing) {
      sign.getComponent(TextboxComponent).hideTextbox();
    } else {
      sign.getComponent(TextboxComponent).showTextbox();
    }
  }

  onExit(sign: Phecs.Entity) {
    sign.getComponent(SpriteIndicatorComponent).indicator.hide();

    if (sign.getComponent(TextboxComponent).isTextboxShowing) {
      sign.getComponent(TextboxComponent).hideTextbox();
    }
  }
}
