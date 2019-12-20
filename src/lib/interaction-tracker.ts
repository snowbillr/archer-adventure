export class InteractionTracker {
  private entities: { [id: string]: InteractionState | null };

  constructor() {
    this.entities = {};
  }

  update(activeEntityIds: string[]) {
    // if entity is 'inactive' and in the active list, set to 'entering'
    // if entity is 'entering' set to 'active'
    // if entity is 'active' and in the active list, do nothing
    // if entity is 'active' and not in the active list, set to 'exiting'
    // if entity is 'exiting' set to 'inactive'

    const allEntityIds = new Set([...Object.keys(this.entities), ...activeEntityIds]);
    allEntityIds.forEach(entityId => {
      const state = this.entities[entityId];

      if ((state == null || state === 'inactive') && activeEntityIds.includes(entityId)) {
        this.entities[entityId] = 'entering';
      } else if (state === 'entering') {
        this.entities[entityId] = 'active';
      } else if (state === 'active' && !activeEntityIds.includes(entityId)) {
        this.entities[entityId] = 'exiting';
      } else if (state === 'exiting') {
        this.entities[entityId] = 'inactive';
      }
    });
  }

  getEntityIds(interactionState: InteractionState) {
    return Object.entries(this.entities)
      .filter(([id, state]) => state === interactionState)
      .map(([id]) => id);

  }

  destroy() {
    this.entities = {};
  }
}
