import { client } from "@apis/client"
import { userInfoQueryKey } from "@features/user-info/queries/userInfoQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetUserInfoQueryObject() {
  return queryOptions({
    queryKey: userInfoQueryKey.info(),
    queryFn: client.User.getUserInfo,
    select: ({ data }) => data.result?.userInfo,
  })
}
