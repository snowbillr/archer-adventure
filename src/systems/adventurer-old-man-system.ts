import { BaseInteractionSystem } from './base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';
import { ConversationBoxComponent } from '../components/conversation-box-component';

export class AdventurerOldManSystem extends BaseInteractionSystem {
  private interacting: boolean;

  constructor() {
    super(AdventurerComponent, 'old-man')

    this.interacting = false;
  }

  onEnter(oldMan: Phecs.Entity) {
    oldMan.getComponent(SpriteIndicatorComponent).indicator.show();
  }

  onInteraction(oldMan: Phecs.Entity) {
    const conversationBox = oldMan.getComponent(ConversationBoxComponent);

    if (!this.interacting) {
      this.interacting = true;
      oldMan.getComponent(SpriteIndicatorComponent).indicator.hide();
      conversationBox.startConversation();
    } else if (this.interacting && conversationBox.hasMoreConversation()) {
      conversationBox.continueConversation();
    } else {
      this.interacting = false;
      conversationBox.stopConversation();
    }
  }

  onExit(oldMan: Phecs.Entity) {
    if (this.interacting) {
      oldMan.getComponent(ConversationBoxComponent).stopConversation();
      this.interacting = false;
    }

    oldMan.getComponent(SpriteIndicatorComponent).indicator.hide();
  }
}
