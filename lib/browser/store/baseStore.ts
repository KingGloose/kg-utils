export abstract class baseStore {
  abstract getItem(key: string): any;
  abstract setItem(key: string, value: any, ...args: any[]): void;
  abstract removeItem(key: string, ...args: any[]): void;
  abstract clear(...args: any[]): void;
  abstract hasItem(key: string): boolean;
}
