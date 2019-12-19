import { BaseInteractionSystem } from './base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { SpriteIndicatorComponent } from '../components/sprite-indicator-component';
import { ConversationBoxComponent } from '../components/conversation-box-component';

export class AdventurerOldLadySystem extends BaseInteractionSystem {
  private showing: boolean;

  constructor() {
    super(AdventurerComponent, 'old-lady')

    this.showing = false;
  }

  onEnter(oldLady: Phecs.Entity) {
    oldLady.getComponent(SpriteIndicatorComponent).indicator.show();
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

  onExit(oldLady: Phecs.Entity) {
    oldLady.getComponent(SpriteIndicatorComponent).indicator.hide();
  }
}
