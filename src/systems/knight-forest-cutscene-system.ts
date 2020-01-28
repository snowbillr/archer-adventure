import { BaseScene } from '../scenes/base-scene';
import { EntityManager } from '../lib/phecs/entity-manager';

import { SpriteComponent } from '../components/sprite-component';
import { NameComponent } from '../components/name-component';

import { EnemyActor } from '../actors/enemy-actor';
import { KnightActor } from '../actors/knight-actor';

import { Showrunner } from '../lib/showrunner/showrunner';
import { Script } from '../lib/showrunner/script';
import { disablePhSMPrologue } from '../cutscenes/disable-phsm-prologue';
import { enablePhSMEpilogue } from '../cutscenes/enable-phsm-epilogue';

export class KnightForestCustceneSystem implements Phecs.System {
  private scene: BaseScene;
  private isPlaying: boolean;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
    this.isPlaying = false;
  }

  update(phEntities: EntityManager) {
    if (this.isPlaying) return;

    const adventurerSprite = phEntities.getEntities('adventurer')[0].getComponent(SpriteComponent).sprite;

    const zone = Object.values(this.scene.areaManager.zones)
      .filter(zone => zone.data.cutsceneTrigger)
      .find(zone => {
        return zone.shape.contains(adventurerSprite.x, adventurerSprite.y);
      });

    if (zone) {
      this.isPlaying = true;
      this.playCutscene(phEntities);
    }
  }

  private playCutscene(phEntities: EntityManager) {
    const adventurer = phEntities.getEntities('adventurer')[0];
    const enemy1 = phEntities.getEntities('enemy').find(enemy => enemy.getComponent(NameComponent).name === 'enemyActor1');
    const enemy2 = phEntities.getEntities('enemy').find(enemy => enemy.getComponent(NameComponent).name === 'enemyActor2');
    const knight = phEntities.getEntities('knight').find(enemy => enemy.getComponent(NameComponent).name === 'knightActor');

    if (!adventurer || !enemy1 || !enemy2 || !knight) {
      throw new Error('KnightForestCutsceneSystem::ACTOR_NOT_FOUND');
    }

    const enemyActor1 = new EnemyActor(this.scene, enemy1);
    const enemyActor2 = new EnemyActor(this.scene, enemy2);
    const knightActor = new KnightActor(this.scene, knight);

    const script = new Script([
      knightActor.walkTo(3710, 600),
      knightActor.swing(),
      enemyActor1.die(),

      knightActor.walkTo(3870, 1200),
      knightActor.swing(),
      enemyActor2.die(),

      knightActor.walkTo(3800, 600),

      knightActor.idle(),
    ]);

    new Showrunner(script)
      .setPrologue(() => disablePhSMPrologue(this.scene))
      .setEpilogue(() => enablePhSMEpilogue(this.scene))
      .run();
  }
}
