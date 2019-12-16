import { TextboxComponent } from '../components/textbox-component';
import { BaseAdventurerInteractionControlSystem } from './base-adventurer-interaction-control-system';

export class SignSystem extends BaseAdventurerInteractionControlSystem {
  constructor() {
    super('sign')
  }

  onInteraction(sign: Phecs.Entity) {
    if (sign.getComponent(TextboxComponent).isTextboxShowing) {
      sign.getComponent(TextboxComponent).hideTextbox();
    } else {
      sign.getComponent(TextboxComponent).showTextbox();
    }
  }
}
