import { tasks } from "@features/dashboard/projects/milestones/components/tasks/router"
import { lazy } from "react"
import type { RouteObject } from "react-router"

const MilestonesPage = lazy(() => import("./pages/milestones-page"))
const MilestoneCreatePage = lazy(() => import("./pages/milestone-create"))
const MilestoneEditPage = lazy(() => import("./pages/milestone-edit"))
const TaskCreatePage = lazy(
  () => import("../milestones/components/tasks/pages/task-create-page"),
)
const TaskEditPage = lazy(
  () => import("../milestones/components/tasks/pages/task-update-page"),
)

export const milestones: RouteObject = {
  path: "milestones",
  element: <MilestonesPage />,
  children: [
    {
      path: "create",
      element: <MilestoneCreatePage />,
    },
    {
      path: ":milestoneId",
      element: <MilestoneEditPage />,
      children: [tasks],
    },
    {
      path: ":milestoneId/tasks/create",
      element: <TaskCreatePage />,
    },
    {
      path: ":milestoneId/tasks/:taskId",
      element: <TaskEditPage />,
    },
  ],
}
