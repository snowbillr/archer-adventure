export class StateRegistrarPlugin extends Phaser.Plugins.BasePlugin {
  private states: { [key: string]: PhiniteStateMachine.States.State<any> };
  private sets: { [key: string]: string[] };

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.states = {};
    this.sets = {};
  }

  addSet(id: string, states: PhiniteStateMachine.States.State<any>[]) {
    states.forEach(state => {
      this.states[state.id] = state;
    });

    this.sets[id] = states.map(state => state.id);
  }

  getState(id: string): PhiniteStateMachine.States.State<any>{
    return this.states[id];
  }

  getSet(id: string): PhiniteStateMachine.States.State<any>[] {
    return this.sets[id].map(stateId => this.states[stateId]);
  }
}
