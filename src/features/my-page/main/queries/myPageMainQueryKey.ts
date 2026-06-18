import { myPageQueryKey } from "@features/my-page/queries/myPageQueryKey"
import type { GetProjectCntByStatusWorkerStatusEnum } from "@apis/api"

export const myPageMainQueryKey = {
  all: () => [...myPageQueryKey.all(), "main"] as const,
  projectCountByStatus: (state: GetProjectCntByStatusWorkerStatusEnum) =>
    [...myPageMainQueryKey.all(), "projects", { state }, "count"] as const,
  projects: (state: GetProjectCntByStatusWorkerStatusEnum) =>
    [...myPageMainQueryKey.all(), "projects", { state }, "list"] as const,
}
