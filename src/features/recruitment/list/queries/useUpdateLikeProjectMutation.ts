import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useUpdateLikeProjectMutation(recruitmentId: number) {
  return useMutation({
    mutationFn: () => client.Recruitment.likeRecruitment(recruitmentId),
  })
}
