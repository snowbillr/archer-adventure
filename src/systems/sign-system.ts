import { AdventurerComponent } from '../components/adventurer-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';
import { TextboxComponent } from '../components/textbox-component';
import { EntityManager } from '../lib/phecs/entity-manager';
import { BaseAdventurerInteractionControlSystem } from './base-adventurer-interaction-control-system';

export class SignSystem extends BaseAdventurerInteractionControlSystem {
  constructor() {
    super(AdventurerComponent, 'sign')
  }

  onInteraction(sign: Phecs.Entity) {
    if (sign.getComponent(TextboxComponent).isTextboxShowing) {
      sign.getComponent(TextboxComponent).hideTextbox();
    } else {
      sign.getComponent(TextboxComponent).showTextbox();
    }
  }
}
