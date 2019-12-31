declare module Persistence {
  export interface Document {
    [key: string]: any;

    toJson(): object;
    fromJson(json: Record<string, any>): void;
  }
}