export class StateRegistrarPlugin extends Phaser.Plugins.ScenePlugin {
  private states: { [key: string]: PhiniteStateMachine.States.State<any> };
  private sets: { [key: string]: string[] };

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.states = {};
    this.sets = {};

    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.destroy());
  }

  destroy() {
    this.states = {};
    this.sets = {};
  }

  registerSets(sets: { id: string, states: PhiniteStateMachine.States.State<any>[]}[]) {
    sets.forEach(set => this.addSet(set.id, set.states));
  }

  getState(id: string): PhiniteStateMachine.States.State<any>{
    return this.states[id];
  }

  getSet(id: string): PhiniteStateMachine.States.State<any>[] {
    return this.sets[id].map(stateId => this.states[stateId]);
  }

  private addSet(id: string, states: PhiniteStateMachine.States.State<any>[]) {
    states.forEach(state => {
      this.states[state.id] = state;
    });

    this.sets[id] = states.map(state => state.id);
  }

}
