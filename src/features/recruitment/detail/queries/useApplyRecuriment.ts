import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { ApplyProjectWorkerRecruitmentRequest } from "@apis/model"

export function useApplyRecruitment(recruitmentId: number) {
  return useMutation({
    mutationFn: (payload: ApplyProjectWorkerRecruitmentRequest) => {
      return client.Recruitment.applyRecruitment(recruitmentId, payload)
    },
  })
}
