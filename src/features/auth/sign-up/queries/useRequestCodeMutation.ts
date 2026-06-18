import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useRequestCodeMutation() {
  return useMutation({
    mutationFn: client.Auth.sendSignUpPhoneVerify,
  })
}
