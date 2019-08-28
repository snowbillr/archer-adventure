import { BaseSystem } from './base-system';

import { Sign } from '../entities/sign';

export class SignSystem<T extends Interactable.Entity> extends BaseSystem<T, Sign> implements Tags.TagSystem {
  update(tagManager: Tags.TagManager) {
    super.update(tagManager);

    const interactors = this.tag1s;
    const signs = this.tag2s;

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
