import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PutUserDetailInfoRequest } from "@apis/model"

export function useUpdateUserInfoMutation() {
  return useMutation({
    mutationFn: (data: PutUserDetailInfoRequest) =>
      client.User.updateUserDetailInfo(data),
  })
}
