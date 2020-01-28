import { SCENE_KEYS } from "../constants/scene-keys";
import { MusicRegistrar } from "../registrars/music-registrar";

export class MusicPlugin extends Phaser.Plugins.ScenePlugin {
  private currentMusicKey: string;
  private keyedMusic: Record<string, Phaser.Sound.BaseSound>;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.currentMusicKey = '';
    this.keyedMusic = {};
  }

  playForArea(areaKey: string) {
    const newAreaMusicKey = MusicRegistrar.getMusicForArea(areaKey);
    if (this.currentMusicKey === newAreaMusicKey) {
      return;
    }

    if (this.currentMusicKey) {
      this.scene.tweens.add({
        targets: this.keyedMusic[this.currentMusicKey],
        props: {
          volume: { getStart: () => 1, getEnd: () => 0 }
        },
        onComplete: () => {
          this.keyedMusic[this.currentMusicKey].stop();
        }
      });
    }

    if (!this.keyedMusic[newAreaMusicKey]) {
      this.keyedMusic[newAreaMusicKey] = this.scene.sound.add(newAreaMusicKey, { loop: true });
    }

    const music = this.keyedMusic[newAreaMusicKey];
    music.play();
    this.scene.tweens.add({
      targets: music,
      props: {
        volume: { getStart: () => 0, getEnd: () => 1 }
      }
    });

    this.currentMusicKey = newAreaMusicKey;
  }
}