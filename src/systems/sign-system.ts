import { BaseSystem } from '../lib/base-system';
import { SystemsManager } from '../lib/systems-manager';

type Sign = Systems.HasIndicator.Entity & Systems.HasInteractionCircle.Entity & Systems.HasSprite.Entity;

export class SignSystem<T extends Systems.HasInteractionCircle.Entity> extends BaseSystem<T, Sign> implements SystemsManager.System {
  static SystemTags = {
    interactor: 'sign-interactor',
    sign: 'sign-interactive',
  }

  constructor() {
    super(SignSystem.SystemTags.interactor, SignSystem.SystemTags.sign);
  }

  registerEntity(entity: (T | Sign)) {
    // nothing
  }

  update(tagManager: SystemsManager.SystemsManager) {
    super.update(tagManager);

    const interactors = this.entity1s;
    const signs = this.entity2s;

    interactors.forEach(interactor => {
      signs.forEach(sign => {
        const circle1 = interactor.interactionCircle!;
        const circle2 = sign.interactionCircle!;

        if (Phaser.Geom.Intersects.CircleToCircle(circle1, circle2)) {
          sign.showIndicator();
        } else {
          sign.hideIndicator();
        }
      })
    });
  }
}
