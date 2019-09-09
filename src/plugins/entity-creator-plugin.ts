import { BaseScene } from '../scenes/base-scene';

export class EntityCreatorPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);
  }

  createEntity(rawProperties: { [key: string]: any }, scale: number, depth: number = 0, x: number = 0, y: number = 0) {
    const entity = {} as any;
    const properties = this.normalizeProperties(rawProperties);
    const baseScene = this.scene as BaseScene;

    if (properties.tags) {
      properties.tags.split(',').forEach((tag: string) => {
        (this.scene as BaseScene).systemsManager.registerEntity(entity, tag, {
          scale,
          ...this.getObjectPosition({ x, y }, scale),
          ...properties
        });
      });
    }

    if (properties.layerCollisions) {
      properties.layerCollisions.split(',').forEach((layerName: string) => {
        this.scene.physics.add.collider(entity.sprite, baseScene.areaManager.tileLayers.find(layer => layer.layer.name === layerName)!);
      });
    }

    if (entity.sprite) {
      entity.sprite.setDepth(depth);
    }

    return entity;
  }

  private normalizeProperties(properties: any): { [key: string]: any } {
    if (Array.isArray(properties)) {
      return properties.reduce((acc: any, propertyMap: any) => {
        acc[propertyMap.name] = propertyMap.value;
        return acc;
      }, {});
    } else {
      return properties;
    }
  }

  private getObjectPosition(position: { x: number, y: number }, scale: number = 1) {
    return {
      x: position.x * scale,
      y: position.y * scale,
    };
  }
}
