import 'phaser';

import { SystemsManagerPlugin } from '../plugins/systems-manager-plugin';
import { StateRegistrarPlugin } from '../plugins/state-registrar-plugin';
import { AreaManagerPlugin } from '../plugins/area-manager-plugin';
import { EntityManagerPlugin } from '../plugins/entity-manager-plugin';

export abstract class BaseScene extends Phaser.Scene {
  areaManager!: AreaManagerPlugin;
  entityManager!: EntityManagerPlugin;
  stateRegistrar!: StateRegistrarPlugin;
  systemsManager!: SystemsManagerPlugin;
}
