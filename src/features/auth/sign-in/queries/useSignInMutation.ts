import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useSignInMutation() {
  return useMutation({
    mutationFn: client.Auth.login,
  })
}
