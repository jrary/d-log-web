import { gridgeQueryKey } from "@queries/gridgeQueryKey"

export const dashboardTaskQueryKey = {
  all: () => [...gridgeQueryKey.user(), "dashboard"] as const,
  milestoneDetail: (clientProjectContractId: number, milestoneId: number) =>
    [
      ...dashboardTaskQueryKey.all(),
      "milestone",
      { clientProjectContractId },
      { milestoneId },
    ] as const,
  worker: (projectId: number) =>
    [...dashboardTaskQueryKey.all(), "worker", { projectId }] as const,
  task: (clientProjectContract: number, milestoneId: number | undefined) =>
    [
      ...dashboardTaskQueryKey.all(),
      "task",
      { clientProjectContract },
      { milestoneId },
    ] as const,
  taskDetail: (projectId: number, taskId: number) =>
    [
      ...dashboardTaskQueryKey.all(),
      "task-detail",
      { projectId },
      { taskId },
    ] as const,
  confirmHistory: (projectId: number, milestoneId: number, taskId: number) =>
    [
      ...dashboardTaskQueryKey.all(),
      "confirm-history",
      { projectId },
      { milestoneId },
      { taskId },
    ] as const,
}
