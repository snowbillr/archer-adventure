export class SignSystem implements SystemsManager.System {
  static SystemTags = {
    interactor: 'sign-interactor',
    sign: 'sign-interactive',
  }

  update(systemsManager: SystemsManager.SystemsManager) {
   const signInteractors: Systems.DoorSystem.DoorInteractorEntity[] = systemsManager.getEntities(SignSystem.SystemTags.interactor);
   const signs: Systems.DoorSystem.DoorEntity[] = systemsManager.getEntities(SignSystem.SystemTags.sign);

   signInteractors.forEach(signInteractor => {
     const enteringSignIds = signInteractor.enteringInteractionIds;
     const enteringSigns = signs.filter(sign => enteringSignIds.includes(sign.id));
     enteringSigns.forEach(enteringSign => enteringSign.showIndicator());

     const exitingSignIds = signInteractor.exitingInteractionIds;
     const exitingSigns = signs.filter(sign => exitingSignIds.includes(sign.id));
     exitingSigns.forEach(exitingSign => exitingSign.hideIndicator());
   });
  }
}
