/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export {};
