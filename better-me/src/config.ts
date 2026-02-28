declare global {
  interface Window {
    ENV?: {
      VITE_API_URL?: string;
    };
  }
}

export const API_URL = window.ENV?.VITE_API_URL || import.meta.env.VITE_API_URL;
