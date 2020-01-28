declare module Showrunner {
  type PrologueFn = () => Promise<never> | void;
  type EpilogueFn = () => Promise<never> | void;

  interface ScriptAction {
    run: () => Promise<never>;
  }
}