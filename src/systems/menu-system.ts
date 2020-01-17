import 'phaser';

import { EntityManager } from '../lib/phecs/entity-manager';
import { BaseScene } from '../scenes/base-scene';
import { TextIndicatorComponent } from '../components/text-indicator-component';
import { MenuActionComponent } from '../components/menu-action-component';

export class MenuSystem implements Phecs.System {
  private scene: BaseScene;
  private selectedIndex: number;
  private menuOptions: Phecs.Entity[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
    this.selectedIndex = 0;
    this.menuOptions = [];
  }

  start(phEntities: EntityManager) {
    this.menuOptions = phEntities.getEntities('menuButton');

    this.scene.controls.up.onPress(() => this.changeMenuSelector('up'));
    this.scene.controls.down.onPress(() => this.changeMenuSelector('down'));
    this.scene.controls.action.onPress(() => this.selectMenuOption());
    this.scene.controls.shoot.onPress(() => this.selectMenuOption());

    this.selectFirstEnabledIndicatorPosition()
  }

  private selectFirstEnabledIndicatorPosition() {
    const index = this.menuOptions.findIndex(menuOption => !menuOption.getComponent(MenuActionComponent).disabled)
    this.updateIndicatorPosition(index);
  }

  private changeMenuSelector(direction: 'up' | 'down')  {
    const searchAdjuster = direction === 'up' ? -1 : 1;
    let searchCount = 0;

    const startingIndex = this.selectedIndex;
    let newIndex = this.selectedIndex;
    do {
      searchCount++;
      newIndex = Phaser.Math.Wrap(this.selectedIndex + searchAdjuster, 0, this.menuOptions.length);

      if (searchCount === this.menuOptions.length) {
        newIndex = startingIndex;
        break;
      }
    } while(this.menuOptions[newIndex].getComponent(MenuActionComponent).disabled)

    if (newIndex != startingIndex) {
      this.updateIndicatorPosition(newIndex);
    }
  }

  private updateIndicatorPosition(newSelectedIndex: number) {
    const oldMenuOption = this.menuOptions[this.selectedIndex];
    oldMenuOption.getComponent(TextIndicatorComponent).indicator.hide();

    this.selectedIndex = newSelectedIndex;
    const newMenuOption = this.menuOptions[this.selectedIndex];
    newMenuOption.getComponent(TextIndicatorComponent).indicator.show();
  }

  private selectMenuOption() {
    const menuOption = this.menuOptions[this.selectedIndex];

    menuOption.getComponent(MenuActionComponent).callback();
  }
}
