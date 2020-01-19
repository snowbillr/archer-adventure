import { BaseScene } from '../scenes/base-scene';
import { EntityManager } from '../lib/phecs/entity-manager';
import { SpriteComponent } from '../components/sprite-component';
import { AdventurerActor } from '../actors/adventurer-actor';
import { NameComponent } from '../components/name-component';

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

    const adventurerActor = new AdventurerActor(this.scene, adventurer);
    // const enemyActor1 = new EnemyActor(this.scene, enemy1);
    // const enemyActor2 = new EnemyActor(this.scene, enemy2);
    // const knightActor = new knightActor(this.scene, knight);
  }
}
