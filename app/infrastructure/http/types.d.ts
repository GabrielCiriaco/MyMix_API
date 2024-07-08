export interface ServerDTO {
  start(): Promise<void>;
}

export interface ServerConfig {
  address: string;
  port: number;
}

declare module 'express' {
  export interface Request {
    user?: {
      id: string;
      email: string;
      name: string | null;
      password: string;
    };
  }
}
