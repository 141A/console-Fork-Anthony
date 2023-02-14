export enum Mode {
    CLOUD = 'cloud',
    SELF_HOSTED = 'self-hosted'
}

export const VARS = {
    APPWRITE_ENDPOINT: import.meta.env?.VITE_APPWRITE_ENDPOINT?.toString() as string | null,
    GROWTH_ENDPOINT: import.meta.env?.VITE_APPWRITE_GROWTH_ENDPOINT?.toString() as string | null,
    CONSOLE_MODE: import.meta.env?.VITE_CONSOLE_MODE?.toString() as string | null,
    VERCEL_ENV: import.meta.env?.VITE_VERCEL_ENV?.toString() as string | null,
    GOOGLE_ANALYTICS: import.meta.env?.VITE_GA_PROJECT?.toString() as string | null
};

export const ENV = {
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    PREVIEW: VARS.VERCEL_ENV === 'preview',
    TEST: !!import.meta.env?.VITEST
};

export const MODE = VARS.CONSOLE_MODE === Mode.CLOUD ? Mode.CLOUD : Mode.SELF_HOSTED;
