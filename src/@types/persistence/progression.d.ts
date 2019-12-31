declare module Progression {
  export type Type = 'conversation' | 'quest';

  export type Identifier = {
    type: Type;
    name: string;
    index: number;
  };
}