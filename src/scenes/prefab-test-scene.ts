import 'phaser';
import { BaseScene } from './base-scene';

import { enemyPrefab } from '../entities/enemy/prefab';
import { enemyStates } from '../entities/enemy/states';
import { SpriteComponent } from '../components/sprite-component';
import { PhysicsBodyComponent } from '../components/physics-body-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { AreaBoundaryComponent } from '../components/area-boundary-component';
import { AttachmentComponent } from '../components/attachment-component';
import { BoundsComponent } from '../components/bounds-component';
import { DoorComponent } from '../components/door-component';
import { HitboxComponent } from '../components/hitbox-component';
import { HurtboxComponent } from '../components/hurtbox-component';
import { IndicatorComponent } from '../components/indicator-component';
import { InteractionCircleComponent } from '../components/interaction-circle-component';
import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';
import { ShootsArrowsComponent } from '../components/shoots-arrows-component';
import { TextboxComponent } from '../components/textbox-component';
import { HasAttachmentsSystem } from '../systems/has-attachments-system';
import { HasInteracionCircleSystem } from '../systems/has-interaction-circle-system';
import { HasBoundsSystem } from '../systems/has-bounds-system';
import { HasControlsSystem } from '../systems/has-controls-system';
import { HasHurtboxesSystem } from '../systems/has-hurtboxes-system';
import { HasHitboxesSystem } from '../systems/has-hitboxes-system';
import { HasPhiniteStateMachineSystem } from '../systems/has-phinite-state-machine-system';

export class PrefabTestScene extends BaseScene {
  centerDebugCircle!: Phaser.GameObjects.Shape;
  enemy!: Phecs.Entity;

  constructor() {
    super({key: 'prefabTest'})
  }

  create() {
    this.phecs.phEntities.registerPrefab('enemy', enemyPrefab);

    this.phecs.phComponents.registerComponents(
      [
        { klass: AdventurerComponent, tag: AdventurerComponent.tag },
        { klass: AreaBoundaryComponent, tag: AreaBoundaryComponent.tag },
        { klass: AttachmentComponent, tag: AttachmentComponent.tag },
        { klass: BoundsComponent, tag: BoundsComponent.tag },
        { klass: DoorComponent, tag: DoorComponent.tag },
        { klass: HitboxComponent, tag: HitboxComponent.tag },
        { klass: HurtboxComponent, tag: HurtboxComponent.tag },
        { klass: IndicatorComponent, tag: IndicatorComponent.tag },
        { klass: InteractionCircleComponent, tag: InteractionCircleComponent.tag },
        { klass: PhiniteStateMachineComponent, tag: PhiniteStateMachineComponent.tag },
        { klass: PhysicsBodyComponent, tag: PhysicsBodyComponent.tag },
        { klass: ShootsArrowsComponent, tag: ShootsArrowsComponent.tag },
        { klass: SpriteComponent, tag: SpriteComponent.tag },
        { klass: TextboxComponent, tag: TextboxComponent.tag },
      ]
    );

    this.phecs.phSystems.registerSystems(
      [
        HasAttachmentsSystem,
        HasInteracionCircleSystem,
        HasBoundsSystem,
        HasControlsSystem,
        HasHurtboxesSystem,
        HasHitboxesSystem,
        HasPhiniteStateMachineSystem,
      ]
    );

    this.stateRegistrar.registerSets([
      { id: 'enemy', states: enemyStates },
    ]);

    let frameIndex = 0;
    const frameText = this.add.text(200, 50, `Frame ${frameIndex}`);

    const scale = 2;
    const enemy = this.phecs.phEntities.createPrefab('enemy', {}, scale, 0, 0, 0);

    enemy.components[SpriteComponent.tag].sprite.x = 150;
    enemy.components[SpriteComponent.tag].sprite.y = 200;
    enemy.components[SpriteComponent.tag].sprite.setFrame(frameIndex);

    enemy.components[PhysicsBodyComponent.tag].body.allowGravity = false;

    enemy.components[SpriteComponent.tag].sprite.anims.stop();

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

      enemy.components[SpriteComponent.tag].sprite.setFrame(frameIndex);
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

    this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, e => {
      if (e.key === 'ArrowLeft') {
        enemy.components[PhysicsBodyComponent.tag].body.acceleration.x = -600;
      } else if (e.key === 'ArrowRight') {
        enemy.components[PhysicsBodyComponent.tag].body.acceleration.x = 600;
      } else if (e.key === 'ArrowDown') {
        enemy.components[PhysicsBodyComponent.tag].body.acceleration.x = 0;
        enemy.components[PhysicsBodyComponent.tag].body.velocity.x = 0;
      }
    });

    this.phecs.start();

    this.cameras.main.setBackgroundColor('#cccccc');

    this.enemy = enemy;
  }

  update() {
    const center = this.enemy.components[SpriteComponent.tag].sprite.getCenter();
    this.centerDebugCircle.setPosition(center.x, center.y);
  }
}
