import { GetProjectsWorkerStatusEnum as Status } from "@apis/api"
import { client } from "@apis/client"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetDashboardProjectListQueryObject() {
  return queryOptions({
    queryKey: dashboardQueryKey.projects(),
    queryFn: async () => {
      const { data } = await client.Project.getProjects(
        Status.InProgress,
        0,
        300,
      )
      return data.result?.projectList
    },
    select: (data) => data?.contents ?? [],
  })
}
