import { SpriteComponent } from "./sprite-component"
import { NinePatch } from "@koreez/phaser3-ninepatch";

const conversationScript = [
  "Hello young man!",
  "We've got a problem on our farm and need some help.",
  "Go talk to my husband inside, he can tell you more about it."
]

export class ConversationBoxComponent implements Phecs.Component {
  private scene: Phaser.Scene;

  private conversationBoxSprite: NinePatch;
  private conversationProgressIndex: number;

  private entityY: number;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.scene = scene;
    this.conversationProgressIndex = 0;

    const entitySprite = entity.getComponent(SpriteComponent).sprite;
    this.entityY = entitySprite.y;

    this.conversationBoxSprite = (scene as any).add.ninePatch(
      entitySprite.x,
      entitySprite.y,
      0,
      0,
      'conversation-box',
      null,
      {
        top: 6,
        left: 15,
        right: 15,
        bottom: 12,
      }
    );

    this.stopConversation();
  }

  startConversation() {
    this.conversationBoxSprite.alpha = 1;
    this.conversationProgressIndex = 0;

    this.updateConversationText();
  }

  continueConversation() {
    if (!this.hasMoreConversationLines()) {
      this.stopConversation();
    } else {
      this.conversationProgressIndex += 1;
    }

    this.updateConversationText();
  }

  stopConversation() {
    this.conversationBoxSprite.alpha = 0;
  }

  destroy() {
    this.conversationBoxSprite.destroy();
  }

  // This method recreates the bitmap text each time because
  // resizing the ninepatch removes all its children.
  // https://github.com/koreezgames/phaser3-ninepatch-plugin/blob/master/src/com/koreez/plugin/ninepatch/NinePatch.ts#L123
  private updateConversationText() {
    const text = this.scene.add.bitmapText(0, 0, 'compass-18', conversationScript[this.conversationProgressIndex]);
    text.setOrigin(0.5);

    const offset = 40;
    const padding = 50;
    const textBounds = text.getTextBounds().local;

    this.conversationBoxSprite.resize(textBounds.width + padding, textBounds.height + padding);
    this.conversationBoxSprite.add(text);

    /*
    if (this.hasMoreConversationLines()) {
      const conversationIndicatorSprite = this.scene.add.sprite(textBounds.width / 2, -textBounds.height, 'indicator-right', 0);
      this.conversationBoxSprite.add(conversationIndicatorSprite);
    }
    */

    this.conversationBoxSprite.y = this.entityY - this.conversationBoxSprite.height / 2 - offset;
  }

  private hasMoreConversationLines() {
    return this.conversationProgressIndex < conversationScript.length - 1
  }
}
