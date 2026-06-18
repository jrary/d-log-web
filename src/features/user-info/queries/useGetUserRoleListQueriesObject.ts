import { client } from "@apis/client"
import { userInfoQueryKey } from "@features/user-info/queries/userInfoQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetUserRoleListQueriesObject(jobCategoryIds: number[]) {
  return jobCategoryIds.map((jobCategoryId) => {
    return queryOptions({
      queryKey: userInfoQueryKey.roleList(jobCategoryId),
      queryFn: () => client.User.getUserRoleList(jobCategoryId),
      select: ({ data }) => ({
        jobCategoryId,
        roleIdList: data.result?.userRoleList ?? [],
      }),
    })
  })
}
