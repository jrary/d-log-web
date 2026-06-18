import { client } from "@apis/client"
import { historiesQueryKey } from "@features/dashboard/projects/histories/queries/historiesQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetProjectRoleQueryObject(projectId: number) {
  return queryOptions({
    queryKey: historiesQueryKey.role(projectId),
    queryFn: () => client.Project.getProjectRoles(projectId),
    select: (data) => data.data.result?.projectRoleList,
  })
}
