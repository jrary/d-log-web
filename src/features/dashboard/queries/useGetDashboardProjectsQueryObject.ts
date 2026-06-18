import { GetProjectsWorkerStatusEnum as Status } from "@apis/api"
import { client } from "@apis/client"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetDashboardProjectsQueryObject(page?: number) {
  return queryOptions({
    queryKey: dashboardQueryKey.projects(),
    queryFn: () =>
      client.Project.getProjects(Status.InProgress, page).then(
        (res) => res.data.result?.projectList.contents,
      ),
  })
}
