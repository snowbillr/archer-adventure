
import { BaseScene } from "../scenes/base-scene";

import { PhiniteStateMachineComponent } from "../components/phinite-state-machine-component";

export function enablePhSMEpilogue(scene: BaseScene) {
  scene.phecs.phEntities.getEntities(PhiniteStateMachineComponent).forEach(entity => {
    entity.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.enable();
  });
}