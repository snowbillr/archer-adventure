declare namespace Systems.HasBounds {
  type Frame = {
    key: string;
    frame: number | string;
    bounds: Bounds;
  }

  type Bounds = {
    offset: {
      x: number;
      y: number;
    },
    size: {
      width: number;
      height: number;
    }
  }

  interface Entity extends Phecs.Entity {
    boundsFrames: Frame[];
  }
}

declare namespace Systems.HasHurtboxes {
  type Shape = {
    type: "rectangle";
    x: number;
    y: number;
    height: number;
    width: number;
  }

  type Frame = {
    key: string;
    frame: number | string;
    hurtboxes: Shape[];
  }

  interface Entity extends Phecs.Entity {
    hurtboxFrames: Frame[];

    rectanglePool: Phaser.Geom.Rectangle[];
    activeRectangles: Phaser.Geom.Rectangle[];

    debugRectangles: Phaser.GameObjects.Rectangle[];
    debug: boolean;
    debugPointerPosition: any;
    debugColor: number;
  }
}
declare namespace Systems.HasHitboxes {
  type Shape = {
    type: "rectangle";
    x: number;
    y: number;
    height: number;
    width: number;
  }

  type Frame = {
    key: string;
    frame: number | string;
    hitboxes: Shape[];
  }

  interface Entity extends Phecs.Entity {
    hitboxFrames: Frame[];
  }
}

declare namespace Systems.SignSystem {
  interface SignData {
    message: string;
  }

  interface SignEntity extends Phecs.Entity {
    textboxSprite: Phaser.GameObjects.Container;
    textboxShowTween: Phaser.Tweens.Tween;
    textboxHideTween: Phaser.Tweens.Tween;
    isTextboxShowing: boolean;
    showTextbox: () => void;
    hideTextbox: () => void;
  }

  interface SignInteractorEntity extends Phecs.Entity {}
}

declare namespace Systems.HasAttachments {
  interface Entity extends Phecs.Entity {
    attachments: Attachment[];
    createAttachment(type: string, config: AttachmentConfig): Attachment;
    getAttachmentsByType: (type: string) => Attachment[];
  }

  interface Attachment {
    type: string;
    properties: AttachmentProperties;
    syncToSprite: (sprite: Phaser.GameObjects.Sprite) => void;
    setConfig: (config: AttachmentConfig) => void;
    enable: () => void;
    disable: () => void;
    destroy: () => void;
  }

  interface AttachmentConfig {
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
  }

  interface AttachmentProperties {
    [key: string]: string;
  }
}
