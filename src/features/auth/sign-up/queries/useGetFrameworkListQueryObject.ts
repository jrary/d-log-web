import { client } from "@apis/client"
import { signUpQueryKey } from "@features/auth/sign-up/queries/signUpQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetFrameworkListQueryObject() {
  return queryOptions({
    queryKey: signUpQueryKey.frameworkList(),
    queryFn: () =>
      client.JobCategory.getFrameworkList()
        .then((res) => res.data.result?.frameworkList)
        .then((frameworkList) => frameworkList ?? []),
  })
}
