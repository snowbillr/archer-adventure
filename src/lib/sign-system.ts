import { Sign } from '../entities/sign';

export class SignSystem {
  update(tagManager: Tags.TagManager) {
    const interactors = tagManager.getEntities('sign-interactor') as Interactable.Entity[];
    const interactives = tagManager.getEntities('sign-interactive') as Interactable.Entity[];

    interactors.forEach(interactor => {
      interactives.forEach(interactive => {
        const circle1 = interactor.interactionCircle;
        const circle2 = interactive.interactionCircle;

        const sign = interactive as Sign;
        if (Phaser.Geom.Intersects.CircleToCircle(circle1, circle2)) {
          sign.showIndicator();
        } else {
          sign.hideIndicator();
        }
      })
    });
  }
}
