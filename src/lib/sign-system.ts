import { Sign } from '../entities/sign';

export class SignSystem<T extends Interactable.Entity, U extends Sign> {
  private tag1: string;
  private tag2: string;

  private tag1s: T[];
  private tag2s: U[];

  constructor(tag1: string, tag2: string) {
    this.tag1 = tag1;
    this.tag2 = tag2;

    this.tag1s = [];
    this.tag2s = [];
  }

  update(tagManager: Tags.TagManager) {
    this.tag1s = tagManager.getEntities(this.tag1) as T[];
    this.tag2s = tagManager.getEntities(this.tag2) as U[];

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
