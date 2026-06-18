import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useVerifyCodeMutation() {
  return useMutation({
    mutationFn: client.User.signUpPhoneVerify,
  })
}
