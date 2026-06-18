import { client } from "@apis/client"
import { historiesQueryKey } from "@features/dashboard/projects/histories/queries/historiesQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetProjectListQueryObject() {
  return queryOptions({
    queryKey: historiesQueryKey.project(),
    queryFn: () => client.Project.getProjects("IN_PROGRESS"),
    select: (data) => data.data.result?.projectList.contents,
  })
}
