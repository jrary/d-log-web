import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useWithdrawalMutation() {
  return useMutation({
    mutationFn: client.User.withdraw,
  })
}
