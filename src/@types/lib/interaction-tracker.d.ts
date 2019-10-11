type InteractionState = 'inactive' | 'entering' | 'active' | 'exiting';

interface InteractionTracker {
  update(activeEntityIds: string[]): void;
  getEntityIds(interactionState: InteractionState): string[];
}
