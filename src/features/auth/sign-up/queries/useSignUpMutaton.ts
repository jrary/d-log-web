import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useSignUpMutation() {
  return useMutation({
    mutationFn: client.Auth.signUp,
  })
}
