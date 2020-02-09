import { BaseDamageSystem } from "./base-systems/base-damage-system";

import { PhiniteStateMachineComponent } from "../components/phinite-state-machine-component";

export class ArrowBarrelSystem extends BaseDamageSystem {
  constructor() {
    super(
      {
        entityFetcher: phEntities => {
          return phEntities.getEntities('arrow')
                           .filter(arrow => {
                             const arrowState = arrow.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.currentState.id;
                             return arrowState === 'arrow-flying';
                           });
        },
        boxType: 'hitbox',
      },
      {
        entityFetcher: phEntities => phEntities.getEntities('barrel')
                           .filter(barrel => {
                             const barrelState = barrel.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.currentState.id;
                             return barrelState === 'barrel-idle';
                           }),
        boxType: 'hurtbox',
      },
      (arrow: Phecs.Entity, barrel: Phecs.Entity) => {
        barrel.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.doTransition({ to: 'barrel-destroyed' });
      }
    );
  }
}
