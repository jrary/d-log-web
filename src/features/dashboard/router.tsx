import { DashboardLayout } from "@features/dashboard/layouts/dashboard"
import { histories } from "@features/dashboard/projects/histories/router"
import { tasks } from "@features/dashboard/projects/milestones/components/tasks/router"
import { myWorks } from "@features/dashboard/projects/my-works/router"
import { reports } from "@features/dashboard/projects/reports/router"
import { wbs } from "@features/dashboard/projects/wbs/router"
import { redirectFirstProject } from "@features/dashboard/redirects/redirect-first-project"
import { _redirectLandingPage } from "@/redirects/redirect-landing-page"
import type { RouteObject } from "react-router"

export const dashboard: RouteObject = {
  path: "/dashboard",
  element: <DashboardLayout />,
  loader: _redirectLandingPage,
  children: [
    redirectFirstProject,
    {
      path: "projects/:projectId/contract/:clientProjectContractId/worker/:projectWorkerId",
      children: [myWorks, wbs, histories, reports, tasks],
    },
  ],
}
