import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useFindEmailMutation() {
  return useMutation({
    mutationFn: client.Auth.sendEmail,
  })
}
