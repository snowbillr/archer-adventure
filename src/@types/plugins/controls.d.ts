declare module Controls {
  export type ControlNames = 'left' | 'right' | 'up' | 'down' | 'action' | 'shoot';

  export type Listener = () => void;

  export type ListenerConfig = {
    id: string,
    context: any,
    callback: Listener;
  };
}