import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: client.Auth.updatePassword,
  })
}
