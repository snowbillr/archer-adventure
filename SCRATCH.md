## Controls

```ts
this.scene.inputController.onPress(CONTROL, () => {});
this.scene.inputController.onRelease(CONTROL, () => {});
this.scene.inputController.isDown(CONTROL);
```
Each of these methods takes a `ControlIdentifier` as its first argument. This identifier should
match one of the controls defined in a control scheme.

## Control Schemes

```ts
this.scene.inputController.registerControlScheme('exploration-keyboard', {
  "exploration-action": {
    type: 'keyboard',
    button: 'f'
  },

  // or could use `type: 'gamepad', button: 'R1'`
});
```
Register a control scheme for a given set of controls. Examples:
* exploration controls for the keyboard
* conversation controls for the keyboard
* exploration controls for the gamepad
* conversation controls for the gamepad

`ControlScheme`s can and should have different sets of controls. For example,
the `exploration-keyboard` scheme would have an EXPLORE_LEFT control, an EXPLORE_SHOOT control, etc.
The `conversation-keyboard` scheme would have a CONVERSATION_CONTINUE control, and maybe a left and right control for picking dialogue options.
It's important that they be named differently so that listeners don't overlap for different functionality.

The `InputController` will take care of listening to the phaser events for the active `ControlScheme`
and relaying that information to its `InputControl`s that are exposed as the API.

## Control Scheme Stack

```ts
this.scene.inputController.pushActiveControlScheme('exploration-keyboard');   // active control scheme is keyboard-exploration
this.scene.inputController.pushActiveControlScheme('conversation-keyboard');  // active control scheme is keyboard-conversation
this.scene.inputController.popActiveControlScheme();                          // active control scheme is keyboard-exploration
```

There can only be one active `ControlScheme` at a time, but they live on a stack.
The `ControlScheme` at the top of the stack will be the only one that has its `controls` updated.

When a new `ControlScheme` is pushed, the existing Phaser input listeners will be turned off and
new ones will be turned on for the new scheme's controls.

When a new `ControlScheme` is pushed, the old control scheme will set all the controls to a released state,
and fire off release listeners for all of them.