export class TagSystem {
  private tagMap: { [tag: string]: object[] };
  private systems: (() => void)[]

  constructor() {
    this.tagMap = {};
    this.systems = [];
  }

  add(tag: string, entity: object) {
    this.tagMap[tag] = this.tagMap[tag] || [];
    this.tagMap[tag].push(entity);
  }

  get(tag: string) {
    return this.tagMap[tag];
  }

  addSystem(system: () => void) {
    this.systems.push(system);
  };

  update() {
    this.systems.forEach(system => {
      system.call(this);
    });
  }
}
