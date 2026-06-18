import { gridgeQueryKey } from "@queries/gridgeQueryKey"

export const historiesQueryKey = {
  all: () => [...gridgeQueryKey.user(), "histories"] as const,
  worker: (projectId: number) =>
    [...historiesQueryKey.all(), "worker", { projectId }] as const,
  role: (projectId: number) =>
    [...historiesQueryKey.all(), "role", { projectId }] as const,
  project: () => [...historiesQueryKey.all(), "project"] as const,
  historyList: (
    clientProjectContractId: number,
    filters: {
      roleId?: number[]
      projectWorkerId?: number
      workerId?: string
      startDate?: string
      endDate?: string
      milestoneId?: number
      taskId?: number
      type?: string
      workHistoryFilter: string
      page?: number
    },
  ) =>
    [
      ...historiesQueryKey.all(),
      "history",
      { clientProjectContractId },
      { ...filters },
    ] as const,
}
