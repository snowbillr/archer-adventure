import { BaseScene } from "../scenes/base-scene";

import { PhiniteStateMachineComponent } from "../components/phinite-state-machine-component";

export function disablePhSMPrologue(scene: BaseScene) {
  scene.phecs.phEntities.getEntities(PhiniteStateMachineComponent).forEach(entity => {
    entity.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.disable();
  });
}