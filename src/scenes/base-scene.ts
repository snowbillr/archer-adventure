import 'phaser';

import { SystemsManagerPlugin } from '../plugins/systems-manager-plugin';
import { StateRegistrarPlugin } from '../plugins/state-registrar-plugin';
import { AreaManagerPlugin } from '../plugins/area-manager-plugin';
import { EntityManagerPlugin } from '../plugins/entity-manager-plugin';
import { ComponentManagerPlugin } from '../plugins/component-manager-plugin';

export abstract class BaseScene extends Phaser.Scene {
  areaManager!: AreaManagerPlugin;
  entityManager!: EntityManagerPlugin;
  componentManager!: ComponentManagerPlugin;
  stateRegistrar!: StateRegistrarPlugin;
  systemsManager!: SystemsManagerPlugin;
}
