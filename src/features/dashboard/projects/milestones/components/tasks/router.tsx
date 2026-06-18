import { lazy } from "react"
import type { RouteObject } from "react-router"

const TasksPage = lazy(() => import("./pages/tasks-page"))
const TaskCreatePage = lazy(() => import("./pages/task-create-page"))
const TaskUpdatePage = lazy(() => import("./pages/task-update-page"))

export const tasks: RouteObject = {
  path: "milestones/:milestoneId/tasks",
  element: <TasksPage />,
  children: [
    {
      path: "create",
      element: <TaskCreatePage />,
    },
    {
      path: ":taskId",
      element: <TaskUpdatePage />,
    },
  ],
}
