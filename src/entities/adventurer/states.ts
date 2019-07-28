import { TransitionType } from '../../components/phinite-state';
import { Adventurer } from './index';
import { movementAttributes } from './movement-attributes';

function decelerate(adventurer: Adventurer) {
  const body = adventurer.getBody();
  body.acceleration.x = body.velocity.x < 0 ? movementAttributes.horizontalDeceleration : -movementAttributes.horizontalDeceleration;
}

function haltMovementWithinThreshold(adventurer: Adventurer) {
  const body = adventurer.getBody();
  if (Phaser.Math.Within(body.velocity.x, 0, 100)) {
    body.acceleration.x = 0;
    body.velocity.x = 0;
  }
}

function boostTurnaroundVelocity(adventurer: Adventurer) {
  const body = adventurer.getBody();
  if (!Phaser.Math.Within(body.velocity.x, 0, 5)) {
    body.velocity.x += body.velocity.x * 0.5 * -1;
  }
}

function startRunning(adventurer: Adventurer, direction: "left" | "right") {
  const body = adventurer.getBody();

  if (direction === "left") {
    body.acceleration.x = -movementAttributes.horizontalAcceleration;
  } else if (direction === "right") {
    body.acceleration.x = movementAttributes.horizontalAcceleration;
  }

  boostTurnaroundVelocity(adventurer);
}

const adventurerStand = {
  id:'adventurer-stand',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-idle');
    decelerate(adventurer);
  },
  onUpdate(adventurer: Adventurer) {
    haltMovementWithinThreshold(adventurer);
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowRight',
      to: 'adventurer-run-right',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-run-left',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowDown',
      to: 'adventurer-crouch',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowUp',
      to: 'adventurer-jump',
    }
  ],
};

const adventurerCrouch = {
  id: 'adventurer-crouch',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-crouch');
    decelerate(adventurer);
  },
  onUpdate(adventurer: Adventurer) {
    haltMovementWithinThreshold(adventurer);
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: 'ArrowDown',
      to: (adventurer: Adventurer) => {
        if (adventurer.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (adventurer.controls.right.isDown) {
          return 'adventurer-run-right';
        } else {
          return 'adventurer-stand';
        }
      }
    }
  ]
}

const adventurerRunRight = {
  id: 'adventurer-run-right',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.flipX = false;
    adventurer.sprite.anims.play('adventurer-run');

    startRunning(adventurer, "right");
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: 'ArrowRight',
      to: 'adventurer-stand',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowDown',
      to: (adventurer: Adventurer) => {
        if (Math.abs(adventurer.sprite.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
          return 'adventurer-crouch';
        } else {
          return 'adventurer-slide';
        }
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-run-left',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowUp',
      to: 'adventurer-jump',
    }
  ]
};

const adventurerRunLeft = {
  id: 'adventurer-run-left',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.flipX = true;
    adventurer.sprite.anims.play('adventurer-run');

    startRunning(adventurer, "left");
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: 'ArrowLeft',
      to: 'adventurer-stand',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowDown',
      to: (adventurer: Adventurer) => {
        if (Math.abs(adventurer.sprite.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
          return 'adventurer-crouch';
        } else {
          return 'adventurer-slide';
        }
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowRight',
      to: 'adventurer-run-right',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowUp',
      to: 'adventurer-jump',
    }
  ]
};

const adventurerSlide = {
  id: 'adventurer-slide',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-slide')

    const body = adventurer.getBody();
    if (body.velocity.x > 0) {
      body.acceleration.x = -1 * movementAttributes.slideDeceleration;
    } else {
      body.acceleration.x = movementAttributes.slideDeceleration;
    }
  },
  transitions: [
    {
      type: TransitionType.AnimationEnd,
      animationKey: 'adventurer-slide',
      to: (adventurer: Adventurer) => {
        if (adventurer.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (adventurer.controls.right.isDown) {
          return 'adventurer-run-right';
        } else {
          return 'adventurer-stand';
        }
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowUp',
      to: 'adventurer-jump',
    }
  ],
};

const adventurerJump = {
  id: 'adventurer-jump',
  onEnter(adventurer: Adventurer) {
    const body = adventurer.getBody();
    body.acceleration.x = 0;

    adventurer.sprite.once(`${Phaser.Animations.Events.SPRITE_ANIMATION_KEY_START}adventurer-jump-rise`, () => {
      body.velocity.y = -800;
    });

    adventurer.sprite.anims.play('adventurer-jump-prep');
    adventurer.sprite.anims.chain('adventurer-jump-rise');
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        const body = adventurer.getBody();
        return body.velocity.y > 0;
      },
      to(adventurer: Adventurer) {
        const body = adventurer.getBody();
        if (body.velocity.x > 0) {
          return 'adventurer-fall-right';
        } else if (body.velocity.x < 0) {
          return 'adventurer-fall-left';
        } else {
          return 'adventurer-fall';
        }
      }
    }
  ]
};

const adventurerFall = {
  id: 'adventurer-fall',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-fall');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-fall-left',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowRight',
      to: 'adventurer-fall-right',
    },
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        const body = adventurer.getBody();
        return Phaser.Math.Within(body.velocity.y, 0, 5);
      },
      to(adventurer: Adventurer) {
        if (adventurer.controls.down.isDown) {
          if (Math.abs(adventurer.sprite.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
            return 'adventurer-crouch';
          } else {
            return 'adventurer-slide';
          }
        } else if (adventurer.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (adventurer.controls.right.isDown) {
          return 'adventurer-run-right';
        }  else {
          return 'adventurer-stand';
        }
      }
    }
  ],
};

const adventurerFallLeft = {
  id: 'adventurer-fall-left',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-fall');
    adventurer.sprite.flipX = true;

    const body = adventurer.getBody();
    body.acceleration.x = -1 * movementAttributes.fallDriftAcceleration;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowRight',
      to: 'adventurer-fall-right',
    },
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        const body = adventurer.getBody();
        return Phaser.Math.Within(body.velocity.y, 0, 5);
      },
      to(adventurer: Adventurer) {
        if (adventurer.controls.down.isDown) {
          if (Math.abs(adventurer.sprite.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
            return 'adventurer-crouch';
          } else {
            return 'adventurer-slide';
          }
        } else if (adventurer.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (adventurer.controls.right.isDown) {
          return 'adventurer-run-right';
        }  else {
          return 'adventurer-stand';
        }
      }
    }
  ]
};

const adventurerFallRight = {
  id: 'adventurer-fall-right',
  onEnter(adventurer: Adventurer) {
    adventurer.sprite.anims.play('adventurer-fall');
    adventurer.sprite.flipX = false;

    const body = adventurer.getBody();
    body.acceleration.x = movementAttributes.fallDriftAcceleration;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowLeft',
      to: 'adventurer-fall-left',
    },
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        const body = adventurer.getBody();
        return Phaser.Math.Within(body.velocity.y, 0, 5);
      },
      to(adventurer: Adventurer) {
        if (adventurer.controls.down.isDown) {
          if (Math.abs(adventurer.sprite.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
            return 'adventurer-crouch';
          } else {
            return 'adventurer-slide';
          }
        } else if (adventurer.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (adventurer.controls.right.isDown) {
          return 'adventurer-run-right';
        }  else {
          return 'adventurer-stand';
        }
      }
    }
  ]
};

export const states: PhiniteState.State<Adventurer>[] = [
  adventurerStand,
  adventurerCrouch,

  adventurerRunRight,
  adventurerRunLeft,

  adventurerSlide,
  adventurerJump,

  adventurerFall,
  adventurerFallLeft,
  adventurerFallRight,
];
