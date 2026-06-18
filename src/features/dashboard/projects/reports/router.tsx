import { lazy } from "react"
import type { RouteObject } from "react-router"

const ReportsPage = lazy(() => import("./pages/reports-page"))
const ReportDetailPage = lazy(() => import("./pages/report-detail"))

export const reports: RouteObject = {
  path: "reports",
  element: <ReportsPage />,
  children: [{ path: ":reportId", element: <ReportDetailPage /> }],
}
