import 'phaser';

import { AreaManagerPlugin } from '../plugins/area-manager-plugin';
import { PhecsPlugin } from '../plugins/phecs-plugin';
import { PersistencePlugin } from '../plugins/persistence-plugin';
import { ControlsPlugin } from '../plugins/controls/controls-plugin';

export abstract class BaseScene extends Phaser.Scene {
  phecs!: PhecsPlugin;
  areaManager!: AreaManagerPlugin;
  persistence!: PersistencePlugin;
  controls!: ControlsPlugin;
}
