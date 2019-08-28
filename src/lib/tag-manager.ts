export class TagManager implements Tags.TagManager {
  private tagMap: { [tag: string]: Tags.Entity[] };
  private systems: Tags.TagSystem[]

  constructor() {
    this.tagMap = {};
    this.systems = [];
  }

  registerSystem(system: Tags.TagSystem) {
    this.systems.push(system);
  };

  registerEntity(entity: Tags.Entity, tags: (string | string[])) {
    const normalizedTags = Array.isArray(tags) ? tags : [tags];

    normalizedTags.forEach(tag => {
      this.tagMap[tag] = this.tagMap[tag] || [];
      this.tagMap[tag].push(entity);
    });
  }

  getEntities(tag: string) {
    return this.tagMap[tag];
  }

  update() {
    this.systems.forEach(system => {
      system.update(this);
    });
  }
}
