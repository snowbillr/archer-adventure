import 'phaser';

import { SystemsManagerPlugin } from '../plugins/systems-manager-plugin';
import { StateRegistrarPlugin } from '../plugins/state-registrar-plugin';

export class BaseScene extends Phaser.Scene {
  systemsManager!: SystemsManagerPlugin;
  stateRegistrar!: StateRegistrarPlugin;
}
