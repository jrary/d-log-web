import { isEmpty, negate } from "es-toolkit/compat"
import { z } from "zod"

export const recruitmentApplyValidationSchema = z.object({
  workHourPerWeek: z.string(),
  introduce: z
    .string()
    .max(500, "최대 500자까지 입력 가능합니다.")
    .refine(negate(isEmpty), "자기소개는 필수 입력 항목입니다."),
  currentProjectStatus: z
    .string()
    .max(500, "최대 500자까지 입력 가능합니다.")
    .refine(negate(isEmpty), "현재 진행중인 업무는 필수 입력 항목입니다."),
  projectExperience: z
    .string()
    .max(500, "최대 500자까지 입력 가능합니다.")
    .refine(
      negate(isEmpty),
      "기술스택과 유관한 프로젝트 경험은 필수 입력 항목입니다.",
    ),
  ownSkill: z
    .string()
    .max(500, "최대 500자까지 입력 가능합니다.")
    .refine(negate(isEmpty), "스스로 생각한 자기 실력은 필수 입력 항목입니다."),
  coWorkingExperience: z
    .string()
    .max(500, "최대 500자까지 입력 가능합니다.")
    .refine(negate(isEmpty), "협업 경험은 필수 입력 항목입니다."),
  outsourceWithOtherPlatform: z
    .string()
    .max(500, "최대 500자까지 입력 가능합니다.")
    .refine(negate(isEmpty), "외주 경험은 필수 입력 항목입니다."),
  workScopeText: z
    .string()
    .max(500, "최대 500자까지 입력 가능합니다.")
    .refine(negate(isEmpty), "작업범위 확인은 필수 입력 항목입니다."),
  question: z.string().max(500, "최대 500자까지 입력 가능합니다."),
})

export type RecruitmentApplyValidationSchema = z.infer<
  typeof recruitmentApplyValidationSchema
>
