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
      sign.textboxSprite = (this.scene.add as any).ninePatch(0, 0, 200, 50, 'textbox', null, {
        top: 5,
        bottom: 5,
        left: 3,
        right: 5
      });
      sign.textboxSprite
        .setScale(2)
        .setScrollFactor(0);

      sign.textboxSprite.visible = false;
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
          if (sign.textboxSprite.visible) {
            sign.textboxSprite.visible = false;
            sign.showIndicator();
          } else {
            sign.textboxSprite.visible = true;
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
        exitingSign.textboxSprite.visible = false;
     }
   };
  }
}
