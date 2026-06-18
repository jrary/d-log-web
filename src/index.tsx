import "reset.css"
import "@styles/global.css"

import * as ChannelService from "@channel.io/channel-web-sdk-loader"
import { ZIndex } from "@components/shared-components/tokens/z-index"
import * as Sentry from "@sentry/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { router } from "router"

const rootElement = document.getElementById("root")
const channelTalkPluginKey = import.meta.env.VITE_CHANNEL_TALK_PLUGIN_KEY
const isProduction = import.meta.env.MODE === "production"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/api-*.gridge\.co.kr/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  environment: import.meta.env.VITE_APP_ENV,
})

if (rootElement) {
  // prod인 경우 채널톡 활성화
  if (isProduction && channelTalkPluginKey) {
    ChannelService.loadScript()
    ChannelService.boot({
      pluginKey: channelTalkPluginKey,
      zIndex: ZIndex.overlay - 1, // overlay index의 -1로 설정
    })
  }

  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
