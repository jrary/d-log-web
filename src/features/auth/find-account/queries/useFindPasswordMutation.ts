import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useFindPasswordMutation() {
  return useMutation({
    mutationFn: client.Auth.sendPassword,
  })
}
