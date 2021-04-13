export interface MojangStatusCheck {
  [key: string]: 'red' | 'yellow' | 'green';
}

export interface MojangUUID {
  id: string;
  name: string;
  legacy?: boolean;
  demo?: boolean;
}

export interface MojangNameHistory {
  name: string;
  changeToAt?: number;
}

export interface MojangPlayerProperties {
  name: string;
  value: string;
  signature: string;
}

export interface MojangPlayerProfile {
  id: string;
  name: string;
  legacy?: boolean;
  properties: MojangPlayerProperties[];
}

export interface ChangeSkinPayload {
  token: string;
  variant: 'classic' | 'slim';
  skinUrl: string;
}

export interface AuthenticatePayload {
  email: string;
  password: string;
}
