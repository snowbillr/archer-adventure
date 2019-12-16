import { AdventurerComponent } from '../components/adventurer-component';
import { BaseInteractionIndicatorSystem } from './base-interaction-indicator-system';
import { TextboxComponent } from '../components/textbox-component';

export class AdventurerSignInteractionIndicatorSystem extends BaseInteractionIndicatorSystem {
  constructor() {
    super(AdventurerComponent, 'sign');
  }

  protected onExit(sign: Phecs.Entity) {
    if (sign.getComponent(TextboxComponent).isTextboxShowing) {
      sign.getComponent(TextboxComponent).hideTextbox();
    }
  }
}
