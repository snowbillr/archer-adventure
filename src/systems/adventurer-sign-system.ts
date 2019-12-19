import { TextboxComponent } from '../components/textbox-component';
import { BaseInteractionSystem } from './base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';
import { DoorComponent } from '../components/door-component';
import { ExplorationScene } from '../scenes/exploration-scene';

export class AdventurerSignSystem extends BaseInteractionSystem {
  private scene: ExplorationScene;

  constructor(scene: Phaser.Scene) {
    super(AdventurerComponent, 'sign')

    this.scene = scene as ExplorationScene;
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
