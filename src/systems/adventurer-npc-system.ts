import { BaseInteractionSystem } from "./base-systems/base-interaction-system";
import { AdventurerComponent } from "../components/adventurer-component";
import { SpriteIndicatorComponent } from "../components/sprite-indicator-component";
import { ConversationComponent } from "../components/conversation-component";
import { BaseScene } from "../scenes/base-scene";

export class AdventurerNpcSystem extends BaseInteractionSystem {
  private interacting: boolean;

  constructor(scene: Phaser.Scene) {
    super(scene, AdventurerComponent, 'npc')

    this.interacting = false;
  }

  onEnter(npc: Phecs.Entity) {
    npc.getComponent(SpriteIndicatorComponent).indicator.show();
  }

  onInteraction(npc: Phecs.Entity) {
    const conversation = npc.getComponent(ConversationComponent);

    if (!this.interacting) {
      this.interacting = true;
      npc.getComponent(SpriteIndicatorComponent).indicator.hide();
      conversation.startConversation();
    } else if (this.interacting && conversation.hasMoreConversation()) {
      conversation.continueConversation();
    } else {
      this.interacting = false;
      conversation.stopConversation();

      this.scene.persistence.progression.conversations.markCurrentConversationComplete(conversation.conversationKey);
      this.scene.persistence.save();
    }
  }

  onExit(npc: Phecs.Entity) {
    if (this.interacting) {
      const conversation = npc.getComponent(ConversationComponent);

      if (!conversation.hasMoreConversation()) {
        this.scene.persistence.progression.conversations.markCurrentConversationComplete(conversation.conversationKey);
        this.scene.persistence.save();
      }

      conversation.stopConversation();
      this.interacting = false;
    }

    npc.getComponent(SpriteIndicatorComponent).indicator.hide();
  }
}