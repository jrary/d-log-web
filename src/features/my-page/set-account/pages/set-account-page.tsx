import { Button } from "@components/button.styled"
import { PhoneVerifyField } from "@components/fields/phone-verify"
import { JobCategoryFields } from "@features/job-category/components/fields"
import { AlimtalkField } from "@features/my-page/set-account/components/fields/alimtalk-field"
import { BankAccountField } from "@features/my-page/set-account/components/fields/bank-account-field"
import { InformationFields } from "@features/my-page/set-account/components/fields/information-fields"
import { PortfolioField } from "@features/my-page/set-account/components/fields/portfolio-field"
import { ProfileField } from "@features/my-page/set-account/components/fields/profile-field"
import { ReadonlyFields } from "@features/my-page/set-account/components/fields/readonly-fields"
import { WeeklyExpectUsageHoursField } from "@features/my-page/set-account/components/fields/weekly-expect-usage-hours-field"
import { useUpdateUserInfoMutation } from "@features/my-page/set-account/queries/useUpdateUserInfoMutation"
import { updateUserInfoValidationSchema } from "@features/my-page/set-account/schemas/update-user-info-validation-schema"
import { useGetUserDetailInfoQueryObject } from "@features/user-info/queries/useGetUserDetailInfoQueryObject"
import { useGetUserInfoQueryObject } from "@features/user-info/queries/useGetUserInfoQueryObject"
import { useGetUserRoleListQueriesObject } from "@features/user-info/queries/useGetUserRoleListQueriesObject"
import { userInfoQueryKey } from "@features/user-info/queries/userInfoQueryKey"
import { useQueryClient, useSuspenseQueries } from "@tanstack/react-query"
import { get, map } from "es-toolkit/compat"
import { FormikProvider, useFormik } from "formik"
import toast from "react-hot-toast"
import { toFormikValidate } from "zod-formik-adapter"
import * as Styled from "./set-account-page.styled"

const TEXT = {
  title: "계정 설정",
  description: "나의 계정 정보를 수정할 수 있어요.",
  submit: "저장",
}

export default function SetAccount() {
  const [{ data: user }, { data: detail }] = useSuspenseQueries({
    queries: [useGetUserInfoQueryObject(), useGetUserDetailInfoQueryObject()],
  })
  const jobCategoryList = useSuspenseQueries({
    combine: (result) => result.flatMap(({ data }) => data ?? []),
    queries: useGetUserRoleListQueriesObject(
      map(user?.jobCategory.jobCategoryList ?? [], ({ id = 0 }) => id),
    ),
  })

  const queryClient = useQueryClient()
  const { mutateAsync: updateUserInfo } = useUpdateUserInfoMutation()

  const formik = useFormik({
    enableReinitialize: true,
    validate: toFormikValidate(updateUserInfoValidationSchema),
    initialValues: {
      profileImgUrl: user?.profileImgUrl ?? undefined,
      isRecruitmentAlimTalkDeny: detail?.isRecruitmentAlimTalkDeny ?? false,

      weeklyExpectUsageHours: detail?.weeklyExpectUsageHours ?? undefined,

      bankName: detail?.bankName ?? undefined,
      bankAccountNumber: detail?.bankAccountNumber ?? undefined,

      phone: detail?.phoneNumber ?? "",
      regionCode: "KR",
      verificationCode: undefined,
      verificationDone: false,

      jobCategoryList,
      frameworkIdList: detail?.userFrameworkList ?? [],
      languageIdList: detail?.userLanguageList ?? [],

      portfolioLinkList: detail?.portfolioLinkList ?? [],
      portfolioFileList: detail?.portfolioFileList ?? [],

      introduce: detail?.introduce ?? undefined,
      currentProjectStatus: detail?.currentProjectStatus ?? undefined,
      projectExperience: detail?.projectExperience ?? undefined,
      ownSkill: detail?.ownSkill ?? undefined,
      coWorkingExperience: detail?.coWorkingExperience ?? undefined,
      outsourceWithOtherPlatform:
        detail?.outsourceWithOtherPlatform ?? undefined,
    },
    onSubmit: async (values) => {
      try {
        const response = await updateUserInfo({
          ...values,
          weeklyExpectUsageHours: Number(values.weeklyExpectUsageHours),
          profileImgUrl: values.profileImgUrl
            ? values.profileImgUrl.split("?")[0]
            : undefined,
        })
        if (response.data.isSuccess) {
          toast.success("정보를 수정하였습니다.")
          queryClient.invalidateQueries({
            queryKey: [...userInfoQueryKey.all()],
          })
        }
      } catch (error) {
        toast.error(get(error, "message", "알 수 없는 오류가 발생했습니다."))
      }
    },
  })

  return (
    <FormikProvider value={formik}>
      <Styled.Form>
        <Styled.Header>
          <Styled.Title>{TEXT.title}</Styled.Title>
          <Styled.Description>{TEXT.description}</Styled.Description>
        </Styled.Header>

        <Styled.Fields>
          <ProfileField />

          <WeeklyExpectUsageHoursField />

          <ReadonlyFields />

          <PhoneVerifyField />

          <BankAccountField />

          <JobCategoryFields />

          <PortfolioField />

          <InformationFields />

          <AlimtalkField />
        </Styled.Fields>

        <Styled.Links>
          <Styled.Link
            to="/my-page/set-account"
            onClick={() => toast.error("서비스 준비중입니다.")}>
            비밀번호 변경
          </Styled.Link>
          <Styled.Link to="/auth/withdrawal">회원 탈퇴</Styled.Link>
        </Styled.Links>

        <Button disabled={!formik.isValid || !formik.dirty} type="submit">
          {TEXT.submit}
        </Button>
      </Styled.Form>
    </FormikProvider>
  )
}
