import { marketing, privacy } from "@constants/schemas/agreement"
import {
  email,
  inputPassword,
  name,
  nickname,
  phone,
  regionCode,
} from "@constants/schemas/auth"
import { verificationCode } from "@constants/schemas/verification"
import { z } from "zod"

const jobCategorySchema = z.object({
  jobCategoryId: z.number(),
  roleIdList: z
    .array(z.string())
    .min(1, "직군에 맞는 직무를 1개 이상 선택해주세요."),
})

export const signUpValidationSchema = z
  .object({
    name,
    nickname,

    email,
    inputPassword,

    phone,
    regionCode,
    verificationCode,
    verificationDone: z.boolean(),

    jobCategoryList: z
      .array(jobCategorySchema)
      .min(1, "직군을 1개 이상 선택해주세요."),

    frameworkIdList: z.array(z.string()),
    languageIdList: z.array(z.string()),

    isPrivacyAccepted: privacy,
    isMarketingAccepted: marketing,
  })
  .superRefine((values, ctx) => {
    if (!values.verificationCode || !values.verificationDone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "휴대폰 번호 인증을 완료해주세요.",
        path: ["verificationCode"],
      })
    }
  })

export type SignUpSchema = z.infer<typeof signUpValidationSchema>
