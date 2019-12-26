import { BaseScene } from "./base-scene";
import { SCENE_KEYS } from "../constants/scene-keys";
import { TextComponent } from "../components/text-component";
import { TextIndicatorComponent } from "../components/text-indicator-component";
import { IndicatorSide } from "../lib/indicator";
import { MenuSystem } from "../systems/menu-system";
import { MenuActionComponent } from "../components/menu-action-component";

export class TitleScene extends BaseScene {
  constructor() {
    super({ key: SCENE_KEYS.title });
  }

  init() {
    this.phecs.phEntities.registerPrefab('menuTitle', {
      components: [
        TextComponent,
      ]
    });

    this.phecs.phEntities.registerPrefab('menuButton', {
      components: [
        TextComponent,
        TextIndicatorComponent,
        MenuActionComponent,
      ]
    });

    this.phecs.phSystems.registerSystems([MenuSystem]);
  }

  create() {
    this.add.image(0, 0, 'title-screen').setOrigin(0, 0);
    this.add.image(0, 0, 'vignette-effect').setOrigin(0, 0).setAlpha(0.1);

    const titleEntity = this.phecs.phEntities.createPrefab('menuTitle', {
      x: 400,
      y: 160,
      origin: 0.5,
      font: 'compass-72-title',
      text: 'Archer Adventure',
    });
    titleEntity.getComponent(TextComponent).bitmapText.alpha = 0;

    const continueGameButtonEntity = this.phecs.phEntities.createPrefab('menuButton', {
      x: 400,
      y: 250,
      origin: 0.5,
      font: 'compass-24',
      text: 'Continue Game',
      indicatorSide: IndicatorSide.LEFT,
      menuActionCallback: () => {
        this.phecs.stop();
        this.scene.stop();
        this.scene.start(SCENE_KEYS.continueGame);
      },
    });
    continueGameButtonEntity.getComponent(TextComponent).bitmapText.alpha = 0;

    const newGameButtonEntity = this.phecs.phEntities.createPrefab('menuButton', {
      x: 400,
      y: 290,
      origin: 0.5,
      font: 'compass-24',
      text: 'New Game',
      indicatorSide: IndicatorSide.LEFT,
      menuActionCallback: () => {
        this.phecs.stop();
        this.scene.stop();
        this.scene.start(SCENE_KEYS.newGame);
      },
    });
    newGameButtonEntity.getComponent(TextComponent).bitmapText.alpha = 0;

    const optionsButtonEntity = this.phecs.phEntities.createPrefab('menuButton', {
      x: 400,
      y: 330,
      origin: 0.5,
      font: 'compass-24',
      text: 'Options',
      indicatorSide: IndicatorSide.LEFT,
      menuActionCallback: () => {},
    });
    optionsButtonEntity.getComponent(TextComponent).bitmapText.alpha = 0;

    this.tweens.timeline({
      tweens: [
        {
          targets: [
            titleEntity.getComponent(TextComponent).bitmapText,
          ],
          props: {
            alpha: 1,
          },
          duration: 1000,
        },
        {
          targets: [
            continueGameButtonEntity.getComponent(TextComponent).bitmapText,
            newGameButtonEntity.getComponent(TextComponent).bitmapText,
            optionsButtonEntity.getComponent(TextComponent).bitmapText,
          ],
          props: {
            alpha: 1,
          },
          duration: 500,
          onComplete: () => {
            this.phecs.start();
          }
        }
      ]
    });
  }
}