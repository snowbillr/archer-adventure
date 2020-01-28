import { SCENE_KEYS } from "../constants/scene-keys";
import { MusicRegistrar } from "../registrars/music-registrar";

export class MusicPlugin extends Phaser.Plugins.ScenePlugin {
  private currentArea: string;
  private areaMusic: Record<string, Phaser.Sound.BaseSound>;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.currentArea = '';
    this.areaMusic = {};
  }

  playForArea(areaKey: string) {
    if (MusicRegistrar.getMusicForArea(this.currentArea) === MusicRegistrar.getMusicForArea(areaKey)) {
      return;
    }

    if (this.currentArea) {
      this.areaMusic[this.currentArea].stop();
    }

    this.currentArea = areaKey;

    if (!this.areaMusic[this.currentArea]) {
      this.areaMusic[this.currentArea] = this.scene.sound.add(MusicRegistrar.getMusicForArea(this.currentArea), { loop: true });
    }

    this.areaMusic[this.currentArea].play();
  }
}