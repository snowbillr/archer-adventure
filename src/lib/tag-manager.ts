export class TagManager implements Tags.TagManager {
  private entityMap: { [tag: string]: Tags.Entity[] };
  private systemsMap: { [tag: string]: Tags.TagSystem[] };

  constructor() {
    this.entityMap = {};
    this.systemsMap = {};
  }

  registerSystem(tags: (string | string[]), system: Tags.TagSystem) {
    const normalizedTags = Array.isArray(tags) ? tags : [tags];

    normalizedTags.forEach(tag => {
      this.systemsMap[tag] = this.systemsMap[tag] || [];
      this.systemsMap[tag].push(system);
    });
  };

  registerEntity(entity: Tags.Entity, tags: (string | string[])) {
    const normalizedTags = Array.isArray(tags) ? tags : [tags];

    normalizedTags.forEach(tag => {
      this.entityMap[tag] = this.entityMap[tag] || [];
      this.entityMap[tag].push(entity);

      this.systemsMap[tag] = this.systemsMap[tag] || [];
      this.systemsMap[tag].forEach(system => system.registerEntity(entity));
    });
  }

  getEntities(tag: string) {
    return this.entityMap[tag];
  }

  update() {
    Object.entries(this.systemsMap).forEach(([tag, systems]) => {
      systems.forEach(system => system.update(this));
    });
  }
}
