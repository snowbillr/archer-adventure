import { BaseAdventurerNpcSystem } from './base-systems/base-adventurer-npc-system';

export class AdventurerOldManSystem extends BaseAdventurerNpcSystem {
  constructor(scene: Phaser.Scene) {
    super(scene, 'old-man');
  }
}
