import { BaseAdventurerInteractionControlSystem } from "./base-adventurer-interaction-control-system";
import { ConversationBoxComponent } from "../components/conversation-box-component";

export class AdventurerOldLadyConversationSystem extends BaseAdventurerInteractionControlSystem {
  private showing: boolean;

  constructor() {
    super('old-lady');
    
    this.showing = false;
  }

  onInteraction(oldLady: Phecs.Entity) {
    if (!this.showing) {
      oldLady.getComponent(ConversationBoxComponent).show();
      this.showing = true;
    } else {
      oldLady.getComponent(ConversationBoxComponent).hide();
      this.showing = false;
    }
  }
}