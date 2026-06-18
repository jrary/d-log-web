import { client } from "@apis/client"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetProjectWorkerQueryObject(
  clientProjectContractId: number,
) {
  return queryOptions({
    queryKey: dashboardTaskQueryKey.worker(clientProjectContractId),
    queryFn: () => client.Project.getProjectWorkers(clientProjectContractId),
    select: (data) => data.data.result?.projectWorkerList,
  })
}
