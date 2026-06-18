import { lazy } from "react"
import type { RouteObject } from "react-router"

const WbsPage = lazy(() => import("./pages/wbs-page"))
const MilestoneEditPage = lazy(
  () => import("../milestones/pages/milestone-edit"),
)
const TaskEditPage = lazy(
  () =>
    import("../milestones/components/tasks/components/task-update/task-update"),
)

export const wbs: RouteObject = {
  path: "milestones",
  element: <WbsPage />,
  children: [
    {
      path: ":milestoneId",
      element: <MilestoneEditPage />,
    },
    {
      path: ":milestoneId/tasks/:taskId",
      element: <TaskEditPage />,
    },
  ],
}
