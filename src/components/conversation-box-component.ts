import { SpriteComponent } from "./sprite-component"

export class ConversationBoxComponent implements Phecs.Component {
  private conversationBoxSprite: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    const entitySprite = entity.getComponent(SpriteComponent).sprite;

    const textWidth = 200;
    const textHeight = 100;
    const offset = 40;

    this.conversationBoxSprite = (scene as any).add.ninePatch(
      entitySprite.x,
      entitySprite.y - textHeight / 2 - offset,
      textWidth,
      textHeight,
      'conversation-box',
      null,
      {
        top: 6,
        left: 15,
        right: 15,
        bottom: 12,
      }
    );

    this.hide();
  }

  hide() {
    this.conversationBoxSprite.alpha = 0;
  }

  show() {
    this.conversationBoxSprite.alpha = 1;
  }

  destroy() {
    this.conversationBoxSprite.destroy();
  }
}
