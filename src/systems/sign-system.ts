import { BaseScene } from '../scenes/base-scene';
import { sign } from 'crypto';

export class SignSystem implements SystemsManager.System {
  static SystemTags = {
    interactor: 'sign-interactor',
    sign: 'sign-interactive',
  }

  private scene: BaseScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
  }

  registerEntity(entity: any, data: SystemsManager.EntityRegistrationData, tag: string) {
    if (tag === SignSystem.SystemTags.sign) {
      const sign = entity as Systems.SignSystem.SignEntity;
      const centerX = this.scene.cameras.main.width / 2;
      sign.textboxSprite = (this.scene.add as any).ninePatch(centerX, -100, 300, 50, 'textbox', null, {
        top: 5,
        bottom: 5,
        left: 3,
        right: 5
      });
      sign.textboxSprite
        .setScale(2)
        .setDepth(10)
        .setScrollFactor(0);

      const textboxText = this.scene.add.bitmapText(0, 0, 'compass-24', 'Here is a message');
      textboxText.setOrigin(0.5).setScale(0.5);
      sign.textboxSprite.add(textboxText);

      sign.isTextboxShowing = false;

      sign.textboxShowTween = this.scene.tweens.add({
        targets: sign.textboxSprite,
        y: 75,
        duration: 300,
        ease: Phaser.Math.Easing.Quadratic.Out,
      }).pause();

      sign.textboxHideTween = this.scene.tweens.add({
        targets: [sign.textboxSprite],
        y: -100,
        duration: 300,
        ease: Phaser.Math.Easing.Quadratic.In,
      }).pause();

      sign.showTextbox = () => {
        sign.isTextboxShowing = true;

        sign.textboxHideTween.pause();
        sign.textboxShowTween.restart();
      }

      sign.hideTextbox = () => {
        sign.isTextboxShowing = false;

        sign.textboxShowTween.pause();
        sign.textboxHideTween.restart();
      }
    }
  }

  start(systemsManager: SystemsManager.SystemsManager) {
    const signInteractors: Systems.SignSystem.SignInteractorEntity[] = systemsManager.getEntities(SignSystem.SystemTags.interactor);
    const signs: Systems.SignSystem.SignEntity[] = systemsManager.getEntities(SignSystem.SystemTags.sign);

    const signInteractor = signInteractors[0];
    signs.forEach(sign => {
      const controlKey = signInteractor.controls[sign.interactionControl!];

      controlKey.on(Phaser.Input.Keyboard.Events.DOWN, () => {
        if (sign.activeInteractionIds.has(signInteractor.id)) {
          if (sign.isTextboxShowing) {
            sign.hideTextbox();
            sign.showIndicator();
          } else {
            sign.showTextbox();
            sign.hideIndicator();
          }
        }
      });
    });
  }

  update(systemsManager: SystemsManager.SystemsManager) {
    const signInteractors: Systems.SignSystem.SignInteractorEntity[] = systemsManager.getEntities(SignSystem.SystemTags.interactor);
    const signs: Systems.SignSystem.SignEntity[] = systemsManager.getEntities(SignSystem.SystemTags.sign);

    for (let signInteractor of signInteractors) {
      const enteringSignIds = signInteractor.enteringInteractionIds;
      const enteringSigns = signs.filter(sign => enteringSignIds.has(sign.id));
      for (let enteringSign of enteringSigns) {
        enteringSign.showIndicator();
      }

      const exitingSignIds = signInteractor.exitingInteractionIds;
      const exitingSigns = signs.filter(sign => exitingSignIds.has(sign.id));
      for (let exitingSign of exitingSigns) {
        exitingSign.hideIndicator();

        if (exitingSign.isTextboxShowing) {
          exitingSign.hideTextbox();
        }
      }
    };
  }

  destroy(entity: any, tag: string) {
    if (tag === SignSystem.SystemTags.sign) {
      const sign = entity as Systems.SignSystem.SignEntity;

      sign.textboxShowTween.remove();
      sign.textboxHideTween.remove();
      sign.textboxSprite.destroy();

      delete sign.textboxShowTween;
      delete sign.textboxHideTween;
      delete sign.textboxSprite;
    }
  }
}
