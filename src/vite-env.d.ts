/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_APP_API?: string
  readonly VITE_APP_ENV?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_SENTRY_AUTH_TOKEN?: string
  readonly VITE_CHANNEL_TALK_PLUGIN_KEY?: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}
