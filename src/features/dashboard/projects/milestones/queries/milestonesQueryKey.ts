import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"

export const milestonesQueryKey = {
  all: (projectId: number) =>
    [...dashboardQueryKey.project(projectId), "milestones"] as const,
  contract: (clientProjectContractId: number) =>
    [
      ...dashboardQueryKey.contract(clientProjectContractId),
      "milestones",
    ] as const,
  list: (clientProjectContractId: number) =>
    [...milestonesQueryKey.contract(clientProjectContractId), "list"] as const,
  detail: (clientProjectContractId: number, milestoneId: number) =>
    [
      ...milestonesQueryKey.contract(clientProjectContractId),
      { milestoneId },
      "detail",
    ] as const,
  tasks: (
    clientProjectContractId: number,
    milestoneId: number | undefined,
    projectWorkerId: number | undefined,
  ) =>
    [
      ...milestonesQueryKey.contract(clientProjectContractId),
      { milestoneId },
      { projectWorkerId },
      "tasks",
    ] as const,
  sideMenuTasks: (
    clientProjectContractId: number,
    milestoneId: number | undefined,
    projectWorkerId: number | undefined,
  ) =>
    [
      ...milestonesQueryKey.tasks(
        clientProjectContractId,
        milestoneId,
        projectWorkerId,
      ),
      "sideMenu",
    ] as const,
  progress: (clientProjectContractId: number, milestoneId: number) =>
    [
      ...milestonesQueryKey.contract(clientProjectContractId),
      { milestoneId },
      "progress",
    ] as const,
}
