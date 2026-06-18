import { client } from "@apis/client"
import { signUpQueryKey } from "@features/auth/sign-up/queries/signUpQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetJobCategoryListQueryObject() {
  return queryOptions({
    queryKey: signUpQueryKey.jobCategoryList(),
    queryFn: () =>
      client.JobCategory.getJobCategoryList()
        .then((res) => res.data.result?.jobCategoryList)
        .then((jobCategoryList) => jobCategoryList ?? []),
  })
}
