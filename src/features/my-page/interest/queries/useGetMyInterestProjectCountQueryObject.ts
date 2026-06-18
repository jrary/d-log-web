import { client } from "@apis/client"
import { myInterestQueryKey } from "@features/my-page/interest/queries/myInterestQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetMyInterestProjectCountQueryObject() {
  return queryOptions({
    queryKey: myInterestQueryKey.count(),
    queryFn: () => client.Recruitment.getLikedRecruitment(0, 0),
    select: ({ data }) => data.result?.recruitmentList.totalElements,
  })
}
