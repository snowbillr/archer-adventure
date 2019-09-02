export class SignSystem implements SystemsManager.System {
  static SystemTags = {
    interactor: 'sign-interactor',
    sign: 'sign-interactive',
  }

  update(tagManager: SystemsManager.SystemsManager) {
    const interactors: Systems.HasInteractionCircle.Entity[] = tagManager.getEntities(SignSystem.SystemTags.interactor);
    const signs: Entities.Sign[] = tagManager.getEntities(SignSystem.SystemTags.sign);

    interactors.forEach(interactor => {
      signs.forEach(sign => {
        const circle1 = interactor.interactionCircle;
        const circle2 = sign.interactionCircle;

        if (Phaser.Geom.Intersects.CircleToCircle(circle1, circle2)) {
          sign.showIndicator();
        } else {
          sign.hideIndicator();
        }
      })
    });
  }
}
