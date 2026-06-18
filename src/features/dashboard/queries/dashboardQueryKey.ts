import { gridgeQueryKey } from "@queries/gridgeQueryKey"

export const dashboardQueryKey = {
  all: () => [...gridgeQueryKey.user(), "dashboard"] as const,
  projects: () => [...dashboardQueryKey.all(), "projects"] as const,
  project: (projectId: number) =>
    [...dashboardQueryKey.projects(), { projectId }] as const,
  contract: (clientProjectContractId: number) =>
    [
      ...dashboardQueryKey.projects(),
      "contract",
      { clientProjectContractId },
    ] as const,
  reports: (projectId: number) =>
    [...dashboardQueryKey.projects(), "report", { projectId }] as const,
  milestones: (clientProjectContractId: number) =>
    [
      ...dashboardQueryKey.projects(),
      { clientProjectContractId },
      "milestones",
    ] as const,
}
