declare module Showrunner {
  interface ScriptAction {
    run: () => Promise<never>;
  }
}