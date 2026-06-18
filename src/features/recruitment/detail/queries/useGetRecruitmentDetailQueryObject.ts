import { client } from "@apis/client"
import { recruitmentQueryKey } from "@features/recruitment/queries/recruitmentQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetRecruitmentDetailQueryObject(recruitmentId: number) {
  return queryOptions({
    queryKey: recruitmentQueryKey.detail(recruitmentId),
    queryFn: async () => {
      return client.Recruitment.getRecruitment(recruitmentId)
    },
    select: ({ data }) => data.result?.recruitment,
  })
}
