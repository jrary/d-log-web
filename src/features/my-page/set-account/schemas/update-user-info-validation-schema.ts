import { jobCategorySchema } from "@constants/schemas/job-category"
import { portfolioSchema } from "@constants/schemas/portfolio"
import { z } from "zod"

export const updateUserInfoValidationSchema = z.object({
  isRecruitmentAlimTalkDeny: z.boolean(),
  profileImgUrl: z.string().optional().nullable(),

  weeklyExpectUsageHours: z.string().optional().nullable(),
  verificationCode: z.string().optional().nullable(),

  bankName: z.string().optional().nullable(),
  bankAccountNumber: z.string().optional().nullable(),

  phone: z
    .string()
    .max(12, "올바르지 않은 전화번호 형식입니다.")
    .regex(/^[0-9]*$/, "숫자만 입력해주세요.")
    .optional()
    .nullable(),
  regionCode: z
    .string()
    .regex(/^[A-Z]{2}$/, "지역코드가 올바르지 않습니다.")
    .optional()
    .nullable(),

  jobCategoryList: z.array(jobCategorySchema),
  frameworkIdList: z.array(z.string().or(z.number())),
  languageIdList: z.array(z.string().or(z.number())),

  portfolioLinkList: z
    .array(z.string())
    .max(3, "링크는 최대 3개까지 추가 가능합니다."),
  portfolioFileList: z
    .array(portfolioSchema)
    .max(5, "파일은 최대 5개까지 추가 가능합니다."),

  introduce: z.string().optional().nullable(),
  currentProjectStatus: z.string().optional().nullable(),
  projectExperience: z.string().optional().nullable(),
  ownSkill: z.string().optional().nullable(),
  coWorkingExperience: z.string().optional().nullable(),
  outsourceWithOtherPlatform: z.string().optional().nullable(),
})

export type UpdateUserInfoValidationSchema = z.infer<
  typeof updateUserInfoValidationSchema
>
