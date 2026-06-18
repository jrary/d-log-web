import { client } from "@apis/client"
import { signUpQueryKey } from "@features/auth/sign-up/queries/signUpQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetRoleListQueryObject({
  jobCategoryId,
}: {
  jobCategoryId: number
}) {
  return queryOptions({
    queryKey: signUpQueryKey.roleList(jobCategoryId),
    queryFn: () =>
      client.JobCategory.getRoleList(jobCategoryId)
        .then((res) => res.data.result?.roleList)
        .then((roleList) => roleList ?? []),
  })
}
