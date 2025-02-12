export interface EyeDropperResult {
  sRGBHex: string;
}

export interface EyeDropper {
  open(): Promise<EyeDropperResult>;
}

declare global {
  interface Window {
    EyeDropper?: {
      new (): EyeDropper;
    };
  }
}
