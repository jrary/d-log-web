import { sentryVitePlugin } from "@sentry/vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { FileSystemIconLoader } from "unplugin-icons/loaders"
import icons from "unplugin-icons/vite"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      tsconfigPaths({ loose: true }),
      icons({
        compiler: "jsx",
        jsx: "react",
        customCollections: {
          local: FileSystemIconLoader("src/assets/icons"),
        },
      }),
      sentryVitePlugin({
        disable: mode !== "production",
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
        org: "softsquared-inc",
        project: "gridge-worker-web",
        telemetry: false,
        sourcemaps: {
          filesToDeleteAfterUpload: ["dist/**/*.map"],
        },
      }),
    ],
    server: { port: 3000 },
    build: {
      sourcemap: true,
    },
  }
})
