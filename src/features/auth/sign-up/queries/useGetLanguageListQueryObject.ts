import { client } from "@apis/client"
import { signUpQueryKey } from "@features/auth/sign-up/queries/signUpQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetLanguageListQueryObject() {
  return queryOptions({
    queryKey: signUpQueryKey.languageList(),
    queryFn: () =>
      client.JobCategory.getLanguageList()
        .then((res) => res.data.result?.languageList)
        .then((languageList) => languageList ?? []),
  })
}
