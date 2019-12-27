import { BaseInteractionSystem } from "./base-systems/base-interaction-system";
import { AdventurerComponent } from "../components/adventurer-component";
import { SpriteIndicatorComponent } from "../components/sprite-indicator-component";
import { ConversationComponent } from "../components/conversation-component";

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
    const conversationBox = npc.getComponent(ConversationComponent);

    if (!this.interacting) {
      this.interacting = true;
      npc.getComponent(SpriteIndicatorComponent).indicator.hide();
      conversationBox.startConversation();
    } else if (this.interacting && conversationBox.hasMoreConversation()) {
      conversationBox.continueConversation();
    } else {
      this.interacting = false;
      conversationBox.stopConversation();
    }
  }

  onExit(npc: Phecs.Entity) {
    if (this.interacting) {
      npc.getComponent(ConversationComponent).stopConversation();
      this.interacting = false;
    }

    npc.getComponent(SpriteIndicatorComponent).indicator.hide();
  }
}