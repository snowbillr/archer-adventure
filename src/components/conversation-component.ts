import { SpriteComponent } from "./sprite-component"
import { NinePatch } from "@koreez/phaser3-ninepatch";
import { BaseScene } from "../scenes/base-scene";

export class ConversationComponent implements Phecs.Component {
  private scene: BaseScene;
  private conversation: string[];

  private currentConversationKeyPath: string;
  
  private entityY: number;

  private conversationBoxSprite: NinePatch;
  private conversationProgressIndex: number;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.scene = scene as BaseScene;

    this.currentConversationKeyPath = this.scene.persistence.progression.getCurrentConversationKeyPath(data.conversationKey);
    const conversationKey = this.scene.persistence.progression.getConversationKey(this.currentConversationKeyPath);
    this.conversation = scene.cache.json.get('conversations')[conversationKey];
    
    const entitySprite = entity.getComponent(SpriteComponent).sprite;
    this.entityY = entitySprite.y;

    this.conversationProgressIndex = 0;
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
    if (!this.hasMoreConversation()) {
      this.stopConversation();
    } else {
      this.conversationProgressIndex += 1;
    }

    this.updateConversationText();
  }

  stopConversation() {
    this.conversationBoxSprite.alpha = 0;
  }

  hasMoreConversation() {
    return this.conversationProgressIndex < this.conversation.length - 1
  }

  destroy() {
    this.conversationBoxSprite.destroy();
  }

  // This method recreates the bitmap text each time because
  // resizing the ninepatch removes all its children.
  // https://github.com/koreezgames/phaser3-ninepatch-plugin/blob/master/src/com/koreez/plugin/ninepatch/NinePatch.ts#L123
  private updateConversationText() {
    const text = this.scene.add.bitmapText(0, 0, 'compass-24-conversation', this.conversation[this.conversationProgressIndex]);
    text.setMaxWidth(300);
    text.setOrigin(0.5);

    const offset = 40;
    const padding = 50;
    const textBounds = text.getTextBounds().local;

    this.conversationBoxSprite.resize(textBounds.width + padding, textBounds.height + padding);
    this.conversationBoxSprite.add(text);

    if (this.hasMoreConversation()) {
      const indicator = this.scene.add.sprite(
        this.conversationBoxSprite.width / 2 - 5,
        -this.conversationBoxSprite.height / 2 - 2,
        'indicator-right'
      );
      indicator.setOrigin(1, 0);
      indicator.anims.play('indicator-right');
      this.conversationBoxSprite.add(indicator);
    } else {
      this.scene.persistence.progression.markComplete(this.currentConversationKeyPath);
      this.scene.persistence.save();
    }

    this.conversationBoxSprite.y = this.entityY - this.conversationBoxSprite.height / 2 - offset;
  }
}
