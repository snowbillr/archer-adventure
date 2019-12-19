import { BaseInteractionSystem } from './base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';
import { ConversationBoxComponent } from '../components/conversation-box-component';

export class AdventurerOldLadySystem extends BaseInteractionSystem {
  private interacting: boolean;

  constructor() {
    super(AdventurerComponent, 'old-lady')

    this.interacting = false;
  }

  onEnter(oldLady: Phecs.Entity) {
    oldLady.getComponent(SpriteIndicatorComponent).indicator.show();
  }

  onInteraction(oldLady: Phecs.Entity) {
    if (!this.interacting) {
      oldLady.getComponent(ConversationBoxComponent).show();
      oldLady.getComponent(SpriteIndicatorComponent).indicator.hide();
      this.interacting = true;
    } else {
      oldLady.getComponent(ConversationBoxComponent).hide();
      oldLady.getComponent(SpriteIndicatorComponent).indicator.show();
      this.interacting = false;
    }
  }

  onExit(oldLady: Phecs.Entity) {
    if (this.interacting) {
      oldLady.getComponent(ConversationBoxComponent).hide();
    }

    oldLady.getComponent(SpriteIndicatorComponent).indicator.hide();
  }
}
