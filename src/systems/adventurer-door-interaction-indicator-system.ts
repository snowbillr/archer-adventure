import { DoorComponent } from '../components/door-component';
import { AdventurerComponent } from '../components/adventurer-component';
import { BaseInteractionIndicatorSystem } from './base-interaction-indicator-system';

export class AdventurerDoorInteractionIndicatorSystem extends BaseInteractionIndicatorSystem {
  constructor() {
    super(AdventurerComponent, DoorComponent);
  }
}
