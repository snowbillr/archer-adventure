  type SignData = {
    message: string;
  }

export class TextboxComponent implements Phecs.Component {
  public static tag: string = 'textbox';

  public isTextboxShowing: boolean;

  private signs: Systems.SignSystem.SignData[];
  private textboxSprite: Phaser.GameObjects.Container;
  private textboxShowTween: Phaser.Tweens.Tween;
  private textboxHideTween: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData) {
    this.signs = scene.cache.json.get('signs');
    this.isTextboxShowing = false;

    const centerX = scene.cameras.main.width / 2;
    this.textboxSprite = (scene.add as any).ninePatch(centerX, -100, 300, 50, 'textbox', null, {
      top: 5,
      bottom: 5,
      left: 5,
      right: 5
    });
    this.textboxSprite
      .setScale(2)
      .setDepth(10)
      .setScrollFactor(0);

    const textboxText = scene.add.bitmapText(0, 0, 'compass-24', this.signs[data.signId].message);
    textboxText.setOrigin(0.5).setScale(0.5);
    this.textboxSprite.add(textboxText);

    this.textboxShowTween = scene.tweens.add({
      targets: this.textboxSprite,
      y: 75,
      duration: 300,
      ease: Phaser.Math.Easing.Quadratic.Out,
    }).pause();

    this.textboxHideTween = scene.tweens.add({
      targets: [this.textboxSprite],
      y: -100,
      duration: 300,
      ease: Phaser.Math.Easing.Quadratic.In,
    }).pause();
  }

  showTextbox() {
    this.isTextboxShowing = true;

    this.textboxHideTween.pause();
    this.textboxShowTween.restart();
  }

  hideTextbox() {
    this.isTextboxShowing = false;

    this.textboxShowTween.pause();
    this.textboxHideTween.restart();
  }

  destroy() {
    this.textboxShowTween.remove();
    this.textboxHideTween.remove();
    this.textboxSprite.destroy();

    delete this.textboxShowTween;
    delete this.textboxHideTween;
    delete this.textboxSprite;
  }
}
