import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PatchProjectWorkHistoryRequest } from "@apis/model"

export function useUpdateMyWorkMutation(
  clientProjectContractId: number,
  workHistoryId: number,
) {
  return useMutation({
    mutationFn: (data: PatchProjectWorkHistoryRequest) =>
      client.WorkHistory.updateProjectWorkHistory(
        clientProjectContractId,
        workHistoryId,
        data,
      ),
  })
}
