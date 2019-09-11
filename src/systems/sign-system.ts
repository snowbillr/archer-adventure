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

  start(systemsManager: SystemsManager.SystemsManager) {
    const signInteractors: Systems.SignSystem.SignInteractorEntity[] = systemsManager.getEntities(SignSystem.SystemTags.interactor);
    const signs: Systems.SignSystem.SignEntity[] = systemsManager.getEntities(SignSystem.SystemTags.sign);

    const signInteractor = signInteractors[0];
    signs.forEach(sign => {
      const controlKey = signInteractor.controls[sign.interactionControl!];

      controlKey.on(Phaser.Input.Keyboard.Events.DOWN, () => {
        if (sign.activeInteractionIds.has(signInteractor.id)) {
          console.log('reading it')
        }
      });
    });
  }

  update(systemsManager: SystemsManager.SystemsManager) {
   const signInteractors: Systems.DoorSystem.DoorInteractorEntity[] = systemsManager.getEntities(SignSystem.SystemTags.interactor);
   const signs: Systems.DoorSystem.DoorEntity[] = systemsManager.getEntities(SignSystem.SystemTags.sign);

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
     }
   };
  }
}
