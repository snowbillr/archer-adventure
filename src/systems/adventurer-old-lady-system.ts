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
    const conversationBox = oldLady.getComponent(ConversationBoxComponent);

    if (!this.interacting) {
      this.interacting = true;
      oldLady.getComponent(SpriteIndicatorComponent).indicator.hide();
      conversationBox.startConversation();
    } else if (this.interacting && conversationBox.hasMoreConversation()) {
      conversationBox.continueConversation();
    } else {
      this.interacting = false;
      conversationBox.stopConversation();
    }
  }

  onExit(oldLady: Phecs.Entity) {
    if (this.interacting) {
      oldLady.getComponent(ConversationBoxComponent).stopConversation();
      this.interacting = false;
    }

    oldLady.getComponent(SpriteIndicatorComponent).indicator.hide();
  }
}
