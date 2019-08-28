declare namespace Interactable {
  interface Component {
    create(): void;
    update(): void;

    getInteractionCircle(): Phaser.Geom.Circle;
  }

  interface Entity {
    interactionCircle: Phaser.Geom.Circle;
  }
}
