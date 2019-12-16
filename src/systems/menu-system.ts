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
    this.menuOptions = phEntities.getEntitiesByType('menuButton');

    this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.keyboardListener, this);

    this.updateIndicator(this.selectedIndex);
  }

  stop() {
    this.scene.input.keyboard.off(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.keyboardListener, this);
  }

  private keyboardListener(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      this.updateIndicator(Phaser.Math.Wrap(this.selectedIndex - 1, 0, this.menuOptions.length));
    } else if (e.key === 'ArrowUp') {
      this.updateIndicator(Phaser.Math.Wrap(this.selectedIndex - 1, 0, this.menuOptions.length));
    } else if (e.key === ' ' || e.key === 'f') {
      this.selectMenuOption();
    }
  }

  private updateIndicator(newSelectedIndex: number) {
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
