import { BasePersistenceDocument } from "./base-persistence-document";

export class LocationDocument extends BasePersistenceDocument {
  public areaKey: string;
  public markerName: string;

  constructor() {
    super(['areaKey', 'markerName']);

    this.areaKey = '';
    this.markerName = '';
  }
}