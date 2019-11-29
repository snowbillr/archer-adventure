import { BaseScene } from '../scenes/base-scene';
import { IndicatorComponent } from '../components/indicator-component';
import { AdventurerComponent } from '../components/adventurer-component';

export class SignSystem implements SystemsManager.System {
  static SystemTags = {
    interactor: 'sign-interactor',
    sign: 'sign-interactive',
  }

  private scene: BaseScene;
  private signs: Systems.SignSystem.SignData[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
    this.signs = this.scene.cache.json.get('signs');
  }

  registerEntity(entity: any, data: SystemsManager.EntityRegistrationData, tag: string) {
    if (tag === SignSystem.SystemTags.sign) {
      const sign = entity as Systems.SignSystem.SignEntity;

      const centerX = this.scene.cameras.main.width / 2;
      sign.textboxSprite = (this.scene.add as any).ninePatch(centerX, -100, 300, 50, 'textbox', null, {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
      });
      sign.textboxSprite
        .setScale(2)
        .setDepth(10)
        .setScrollFactor(0);

      const textboxText = this.scene.add.bitmapText(0, 0, 'compass-24', this.signs[data.signId].message);
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
    const adventurer: Phecs.Entity = systemsManager.getEntities(AdventurerComponent.tag)[0];
    const signs: Systems.SignSystem.SignEntity[] = systemsManager.getEntities(SignSystem.SystemTags.sign);

    signs.forEach(sign => {
      const controlKey = adventurer.components[AdventurerComponent.tag].controls[sign.interactionControl!];

      controlKey.on(Phaser.Input.Keyboard.Events.DOWN, () => {
        const activeInteractionIds = sign.interactionTracker.getEntityIds('active');
        if (activeInteractionIds.includes(adventurer.id)) {
          if (sign.isTextboxShowing) {
            sign.hideTextbox();
            sign.components[IndicatorComponent.tag].showIndicator();
          } else {
            sign.showTextbox();
            sign.components[IndicatorComponent.tag].hideIndicator();
          }
        }
      });
    });
  }

  update(systemsManager: SystemsManager.SystemsManager) {
    const signInteractors: Systems.SignSystem.SignInteractorEntity[] = systemsManager.getEntities(SignSystem.SystemTags.interactor);
    const signs: Systems.SignSystem.SignEntity[] = systemsManager.getEntities(SignSystem.SystemTags.sign);

    for (let signInteractor of signInteractors) {
      const enteringSignIds = signInteractor.interactionTracker.getEntityIds('entering');
      const enteringSigns = signs.filter(sign => enteringSignIds.includes(sign.id));
      for (let enteringSign of enteringSigns) {
        enteringSign.components[IndicatorComponent.tag].showIndicator();
      }

      const exitingSignIds = signInteractor.interactionTracker.getEntityIds('exiting');
      const exitingSigns = signs.filter(sign => exitingSignIds.includes(sign.id));
      for (let exitingSign of exitingSigns) {
        exitingSign.components[IndicatorComponent.tag].hideIndicator();

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
