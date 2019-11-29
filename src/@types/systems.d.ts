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
}

declare namespace Systems.SignSystem {
  interface SignData {
    message: string;
  }
}

declare namespace Systems.HasAttachments {
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
