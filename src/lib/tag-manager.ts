export class TagManager implements Tags.TagManager {
  private tagMap: { [tag: string]: object[] };
  private systems: Tags.TagSystem[]

  constructor() {
    this.tagMap = {};
    this.systems = [];
  }

  registerSystem(system: Tags.TagSystem) {
    this.systems.push(system);
  };

  registerEntity(tag: string, entity: object) {
    this.tagMap[tag] = this.tagMap[tag] || [];
    this.tagMap[tag].push(entity);
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
