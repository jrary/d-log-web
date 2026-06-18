import { lazy } from "react"
import type { RouteObject } from "react-router"

const HistoriesPage = lazy(() => import("./pages/histories-page"))

export const histories: RouteObject = {
  path: "histories",
  element: <HistoriesPage />,
}
