import { client } from "@apis/client"
import { jobCategoryQueryKey } from "@features/job-category/queries/jobCategoryQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetLanguagesQueryObject() {
  return queryOptions({
    queryKey: jobCategoryQueryKey.languages(),
    queryFn: client.JobCategory.getLanguageList,
    select: ({ data }) => data.result?.languageList ?? [],
  })
}
