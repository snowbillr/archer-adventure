import 'phaser';

import { AreaManagerPlugin } from '../plugins/area-manager-plugin';
import { PhecsPlugin } from '../plugins/phecs-plugin';
import { PersistencePlugin } from '../plugins/persistence-plugin';
import { ControlsPlugin } from '../plugins/controls/controls-plugin';
import { MusicPlugin } from '../plugins/music-plugin';

export abstract class BaseScene extends Phaser.Scene {
  phecs!: PhecsPlugin;
  areaManager!: AreaManagerPlugin;
  persistence!: PersistencePlugin;
  controls!: ControlsPlugin;
  music!: MusicPlugin;
}
