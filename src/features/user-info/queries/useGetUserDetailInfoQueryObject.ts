import { client } from "@apis/client"
import { userInfoQueryKey } from "@features/user-info/queries/userInfoQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetUserDetailInfoQueryObject() {
  return queryOptions({
    queryKey: userInfoQueryKey.detail(),
    queryFn: client.User.getUserDetailInfo,
    select: ({ data }) => data.result?.userDetailInfo,
  })
}
