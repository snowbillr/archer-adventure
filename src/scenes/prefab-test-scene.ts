import 'phaser';
import { BaseScene } from './base-scene';

import { enemyPrefab } from '../entities/enemy/prefab';
import { enemyStates } from '../entities/enemy/states';
import { SpriteComponent } from '../components/sprite-component';
import { PhysicsBodyComponent } from '../components/physics-body-component';
import { HasAttachmentsSystem } from '../systems/has-attachments-system';
import { HasInteracionCircleSystem } from '../systems/has-interaction-circle-system';
import { HasBoundsSystem } from '../systems/has-bounds-system';
import { HasControlsSystem } from '../systems/has-controls-system';
import { HasHurtboxesSystem } from '../systems/has-hurtboxes-system';
import { HasHitboxesSystem } from '../systems/has-hitboxes-system';
import { HasPhiniteStateMachineSystem } from '../systems/has-phinite-state-machine-system';
import { adventurerTestPrefab } from '../entities/adventurer/test-prefab';
import { arrowPrefab } from '../entities/arrow/prefab';
import { arrowStates } from '../entities/arrow/states';

export class PrefabTestScene extends BaseScene {
  centerDebugCircle!: Phaser.GameObjects.Shape;
  enemy!: Phecs.Entity;

  constructor() {
    super({key: 'prefabTest'})
  }

  create() {
    this.phecs.phEntities.registerPrefab('arrow', arrowPrefab);

    this.phecs.phSystems.registerSystems(
      [
        HasAttachmentsSystem,
        HasInteracionCircleSystem,
        HasBoundsSystem,
        HasControlsSystem,
        HasHurtboxesSystem,
        HasHitboxesSystem,
      ]
    );

    this.stateRegistrar.registerSets([
      { id: 'arrow', states: arrowStates },
    ]);

    let frameIndex = 0;
    const frameText = this.add.text(200, 50, `Frame ${frameIndex}`);

    const scale = 5;
    const enemy = this.phecs.phEntities.createPrefab('arrow', {}, scale, 0, 0);

    enemy.getComponent(SpriteComponent).sprite.x = 150;
    enemy.getComponent(SpriteComponent).sprite.y = 200;
    enemy.getComponent(SpriteComponent).sprite.setFrame(frameIndex);

    enemy.getComponent(PhysicsBodyComponent).body.allowGravity = false;

    enemy.getComponent(SpriteComponent).sprite.anims.stop();

    this.centerDebugCircle = this.add.circle(0, 0, 10, 0x00FF00);
    this.centerDebugCircle.setDepth(100);

    this.input.keyboard.on('keydown', (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          frameIndex++
          break;
        case "ArrowDown":
          frameIndex--;
          break;
      }

      enemy.getComponent(SpriteComponent).sprite.setFrame(frameIndex);
      frameText.setText(`Frame ${frameIndex}`);
    });

    /*
    this.tweens.add({
      targets: [enemy.components[SpriteComponent.tag].sprite],
      props: { x: 600 },
      yoyo: true,
      repeat: -1,
    })
    */

    console.log(enemy)

    this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (e: { key: string; }) => {
      if (e.key === 'ArrowLeft') {
        enemy.getComponent(PhysicsBodyComponent).body.acceleration.x = -600;
      } else if (e.key === 'ArrowRight') {
        enemy.getComponent(PhysicsBodyComponent).body.acceleration.x = 600;
      } else if (e.key === ' ') {
        enemy.getComponent(PhysicsBodyComponent).body.acceleration.x = 0;
        enemy.getComponent(PhysicsBodyComponent).body.velocity.x = 0;
      }
    });

    this.phecs.start();

    this.cameras.main.setBackgroundColor('#cccccc');

    this.enemy = enemy;

    this.events.on(Phaser.Scenes.Events.POST_UPDATE, this.myUpdate, this);
  }

  myUpdate() {
    const center = this.enemy.getComponent(SpriteComponent).sprite.getCenter();
    this.centerDebugCircle.setPosition(center.x, center.y);
  }
}
