import { z } from "zod"

export const milestoneFormValidationSchema = z.object({
  milestoneName: z
    .string()
    .min(1, "프로젝트 마일스톤 이름을 입력해주세요.")
    .max(50, "최대 50자까지 입력 가능합니다."),
  milestoneObjective: z
    .string()
    .min(0, "달성 목표를 입력해주세요.")
    .max(50, "최대 50자까지 입력 가능합니다."),
  milestoneStartDate: z
    .string()
    .min(1, "총 마일스톤 일정을 선택해주세요.")
    .nullish()
    .optional(),
  milestoneEndDate: z
    .string()
    .min(1, "총 마일스톤 일정을 선택해주세요.")
    .nullish()
    .optional(),
})

export type MilestoneFormValidationSchema = z.infer<
  typeof milestoneFormValidationSchema
>
