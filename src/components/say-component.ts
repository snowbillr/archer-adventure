import { SpriteComponent } from "./sprite-component"

export class SayComponent implements Phecs.Component {
  private scene: Phaser.Scene;
  private text: Phaser.GameObjects.DynamicBitmapText;
  private targetSprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    this.scene = scene;
    this.targetSprite = entity.getComponent(SpriteComponent).sprite;

    this.text = scene.add.dynamicBitmapText(0, 0, 'compass-24', '');
    this.text.setOrigin(0.5, 0.5);
    this.text.setDepth(4);

    this.hide();
  }

  say(text: string, duration: number, callback: () => void) {
    const position = this.targetSprite.getTopCenter();

    this.text.setText(text);
    this.text.setPosition(position.x, position.y - 40);

    this.scene.time.delayedCall(duration, () => {
      this.text.setVisible(false);
      callback();
    });

    this.show();
  }

  shout(text: string, duration: number, callback: () => void) {
    this.text.setDisplayCallback(characterData => {
      characterData.x = Phaser.Math.Between(characterData.x - 0, characterData.x + 0);
      characterData.y = Phaser.Math.Between(characterData.y - 1, characterData.y + 1);
  
      return characterData;
    });

    this.say(text, duration, () => {
      this.text.setDisplayCallback(() => {});
      callback();
    });
  }

  destroy() {
    this.text.destroy();

    delete this.scene;
    delete this.text;
    delete this.targetSprite;
  }

  private hide() {
    this.text.setActive(false);
    this.text.setVisible(false);
  }

  private show() {
    this.text.setActive(true);
    this.text.setVisible(true);
  }
}