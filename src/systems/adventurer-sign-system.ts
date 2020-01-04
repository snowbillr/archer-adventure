import { TextboxComponent } from '../components/textbox-component';
import { BaseInteractionSystem } from './base-systems/base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';

export class AdventurerSignSystem extends BaseInteractionSystem {
  constructor(scene: Phaser.Scene) {
    super(scene, AdventurerComponent, 'sign')
  }

  onEnter(adventurer: Phecs.Entity, sign: Phecs.Entity) {
    sign.getComponent(SpriteIndicatorComponent).indicator.show();
  }

  onInteraction(adventurer: Phecs.Entity, sign: Phecs.Entity) {
    if (sign.getComponent(TextboxComponent).isTextboxShowing) {
      sign.getComponent(TextboxComponent).hideTextbox();
    } else {
      sign.getComponent(TextboxComponent).showTextbox();
    }
  }

  onExit(adventurer: Phecs.Entity, sign: Phecs.Entity) {
    sign.getComponent(SpriteIndicatorComponent).indicator.hide();

    if (sign.getComponent(TextboxComponent).isTextboxShowing) {
      sign.getComponent(TextboxComponent).hideTextbox();
    }
  }
}
