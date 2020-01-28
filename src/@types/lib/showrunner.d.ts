declare module Showrunner {
  type ShowrunnerOptions = {
    letterbox: boolean,
  }

  interface ScriptAction {
    run: () => Promise<never>;
  }
}