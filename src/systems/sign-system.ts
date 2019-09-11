import { BaseScene } from '../scenes/base-scene';

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

      sign.isTextboxShowing = false;

      sign.showTextbox = () => {
        sign.isTextboxShowing = true;

        this.scene.tweens.add({
          targets: sign.textboxSprite,
          y: 75,
          duration: 300,
          ease: Phaser.Math.Easing.Quadratic.Out,
        });
      }

      sign.hideTextbox = () => {
        sign.isTextboxShowing = false;

        this.scene.tweens.add({
          targets: [sign.textboxSprite],
          y: -100,
          props: {
            y: -100
          },
          duration: 300,
          ease: Phaser.Math.Easing.Quadratic.In,
        });
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
        exitingSign.hideTextbox();
      }
    };
  }
}
