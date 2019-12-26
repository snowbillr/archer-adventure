import { AdventurerComponent } from "../../components/adventurer-component";
import { SpriteIndicatorComponent } from "../../components/sprite-indicator-component";
import { ConversationBoxComponent } from "../../components/conversation-box-component";
import { BaseInteractionSystem } from "./base-interaction-system";
import { BaseScene } from "../../scenes/base-scene";

export abstract class BaseAdventurerNpcSystem extends BaseInteractionSystem {
  private interacting: boolean;

  constructor(scene: Phaser.Scene, npcType: Phecs.EntityIdentifier) {
    super(scene, AdventurerComponent, npcType)

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