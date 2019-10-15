import 'phaser';

import { BaseScene } from './base-scene';

import { adventurerStates } from '../entities/adventurer/states';
import { sheepStates } from '../entities/sheep/states';
import { arrowStates } from '../entities/arrow/states';
import { enemyStates } from '../entities/enemy/states';

export class MovementTestScene extends BaseScene {
  constructor() {
    super({ key: 'movementTest' });
  }

  create(data: any) {
    super.create(data);

    this.stateRegistrar.registerSets([
      { id: 'adventurer', states: adventurerStates },
      { id: 'enemy', states: enemyStates },
      { id: 'sheep', states: sheepStates },
      { id: 'arrow', states: arrowStates },
    ]);

    this.areaManager.registerArea('starting-area', 'starting-area', 'fantasy-platformer-core', 'fantasy-platformer-core', 2);
    this.areaManager.registerArea('house', 'house', 'fantasy-platformer-core', 'fantasy-platformer-core', 2);

    this.loadNewArea(data.areaKey);
  }
}
