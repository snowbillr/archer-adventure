import { BaseInteractionSystem } from "./base-systems/base-interaction-system";
import { AdventurerComponent } from "../components/adventurer-component";
import { SpriteIndicatorComponent } from "../components/sprite-indicator-component";
import { ConversationComponent } from "../components/conversation-component";
import { BaseScene } from "../scenes/base-scene";

export class AdventurerKnightSystem extends BaseInteractionSystem {
  private interacting: boolean;

  constructor(scene: Phaser.Scene) {
    super(scene, AdventurerComponent, 'knight')

    this.interacting = false;
  }

  onEnter(adventurer: Phecs.Entity, knight: Phecs.Entity) {
    knight.getComponent(SpriteIndicatorComponent).indicator.show();
  }

  onInteraction(adventurer: Phecs.Entity, npc: Phecs.Entity) {
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

  onExit(adventurer: Phecs.Entity, knight: Phecs.Entity) {
    if (this.interacting) {
      const conversation = knight.getComponent(ConversationComponent);

      if (!conversation.hasMoreConversation()) {
        this.scene.persistence.progression.conversations.markCurrentConversationComplete(conversation.conversationKey);
        this.scene.persistence.save();
      }

      conversation.stopConversation();
      this.interacting = false;
    }

    knight.getComponent(SpriteIndicatorComponent).indicator.hide();
  }
}