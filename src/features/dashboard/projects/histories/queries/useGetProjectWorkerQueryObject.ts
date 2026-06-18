import { client } from "@apis/client"
import { historiesQueryKey } from "@features/dashboard/projects/histories/queries/historiesQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetProjectWorkerQueryObject(projectId: number) {
  return queryOptions({
    queryKey: historiesQueryKey.worker(projectId),
    queryFn: () => client.Project.getProjectWorkers(projectId),
    select: (data) => data.data.result?.projectWorkerList,
  })
}
