import { BaseInteractionSystem } from './base-systems/base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { Script } from '../lib/showrunner/script';
import { Showrunner } from '../lib/showrunner/showrunner';
import { AdventurerActor } from '../actors/adventurer-actor';
import { SheepActor } from '../actors/sheep-actor';
import { disablePhSMPrologue } from '../showrunner/disable-phsm-prologue';
import { enablePhSMEpilogue } from '../showrunner/enable-phsm-epilogue';
import { SpriteComponent } from '../components/sprite-component';

export class SheepGateSystem extends BaseInteractionSystem {
  constructor(scene: Phaser.Scene) {
    super(scene, AdventurerComponent, 'sheep');
  }

  onEnter(adventurer: Phecs.Entity, sheep: Phecs.Entity) {
    const adventurerActor = new AdventurerActor(this.scene, adventurer);
    const sheepActor = new SheepActor(this.scene, sheep);

    const script = new Script([
      sheepActor.faceLeft(),
      sheepActor.shout('BAAAAH!'),

      adventurerActor.walk(-100),
    ]);

    new Showrunner(script)
      .setPrologue(async () => {
        const sheepSprite = sheep.getComponent(SpriteComponent).sprite;
        this.scene.cameras.main.stopFollow();
        this.scene.cameras.main.zoomTo(2, 200);
        this.scene.cameras.main.pan(sheepSprite.x, sheepSprite.y, 200);

        disablePhSMPrologue(this.scene);
      })
      .setEpilogue(async () => {
        const adventurerSprite = adventurer.getComponent(SpriteComponent).sprite;

        this.scene.cameras.main.pan(adventurerSprite.x, adventurerSprite.y, 300);
        this.scene.cameras.main.zoomTo(1, 300);
        this.scene.cameras.main.startFollow(adventurerSprite);

        enablePhSMEpilogue(this.scene)
      })
      .run();
  }
}
