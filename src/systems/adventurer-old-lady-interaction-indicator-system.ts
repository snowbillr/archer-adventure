import { AdventurerComponent } from '../components/adventurer-component';
import { BaseInteractionIndicatorSystem } from './base-interaction-indicator-system';

export class AdventurerOldLadyInteractionIndicatorSystem extends BaseInteractionIndicatorSystem {
  constructor() {
    super(AdventurerComponent, 'old-lady');
  }
}
