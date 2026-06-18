import { client } from "@apis/client"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetReportListQueryObject(projectId: number) {
  return queryOptions({
    queryKey: dashboardQueryKey.reports(projectId),
    queryFn: () => client.Project.getProjectReports(projectId),
    select: (data) => data.data.result?.projectReportList.contents,
  })
}
