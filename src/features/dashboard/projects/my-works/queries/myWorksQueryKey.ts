import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"

export const myWorksQueryKey = {
  all: (projectId: number) =>
    [...dashboardQueryKey.project(projectId), "my-works"] as const,
  worker: (projectWorkerId: number) =>
    [
      ...dashboardQueryKey.project(projectWorkerId),
      "my-works",
      "worker",
    ] as const,
  workTime: (projectWorkerId: number) =>
    [...myWorksQueryKey.all(projectWorkerId), "work-time"] as const,
  workHistories: (
    clientProjectContractId: number,
    projectWorkerId: number,
    milestoneId: number | undefined,
    page = 0,
  ) =>
    [
      ...dashboardQueryKey.milestones(clientProjectContractId),
      { projectWorkerId },
      { milestoneId },
      "my-works",
      { page },
    ] as const,
  workHistoryDetails: (
    clientProjectContractId: number,
    projectWorkerId: number,
    milestoneId: number | undefined,
    page = 0,
  ) =>
    [
      ...dashboardQueryKey.milestones(clientProjectContractId),
      { projectWorkerId },
      { milestoneId },
      "history-detail",
      { page },
    ] as const,
  workHistoryProgress: (
    clientProjectContractId: number,
    workDescriptionId: number,
    workStartAt: string,
    workHistoryId: number | undefined,
  ) =>
    [
      ...dashboardQueryKey.milestones(clientProjectContractId),
      { workDescriptionId },
      { workStartAt },
      { workHistoryId },
    ] as const,
}
