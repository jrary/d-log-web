import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useUpdateProjectWorkConfirmMutation(
  clientProjectContractId: number,
  workHistoryId: number,
) {
  return useMutation({
    mutationFn: () =>
      client.WorkHistory.confirmWorkHistory(
        clientProjectContractId,
        workHistoryId,
      ),
  })
}
