import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import NiceModal from "@ebay/nice-modal-react"
import { AgreementField } from "@features/auth/sign-up/components/form/fields/agreement"
import { EmailField } from "@features/auth/sign-up/components/form/fields/email"
import { FrameworkField } from "@features/auth/sign-up/components/form/fields/framework"
import { JobCategoryField } from "@features/auth/sign-up/components/form/fields/job-category"
import { LanguageField } from "@features/auth/sign-up/components/form/fields/language"
import { NickNameField } from "@features/auth/sign-up/components/form/fields/nick-name"
import { PasswordField } from "@features/auth/sign-up/components/form/fields/password"
import { PhoneVerifyField } from "@features/auth/sign-up/components/form/fields/phone-verify"
import { RealNameField } from "@features/auth/sign-up/components/form/fields/real-name"
import { RoleField } from "@features/auth/sign-up/components/form/fields/role"
import { SignUpSuccessModal } from "@features/auth/sign-up/components/modals/sign-up-success"
import { useSignUpMutation } from "@features/auth/sign-up/queries/useSignUpMutaton"
import { signUpValidationSchema } from "@features/auth/sign-up/schemas/sign-up-validation-schema"
import { FormikProvider, useFormik } from "formik"
import { toFormikValidate } from "zod-formik-adapter"
import Logo from "~icons/local/logo_gridge_green.svg"
import * as Styled from "./styled"
import type { SignUpSchema } from "@features/auth/sign-up/schemas/sign-up-validation-schema"

const TEXT = {
  title: "긱워킹을 시작하기 전 회원가입을 해주세요",
  description:
    "그릿지 회원이라면 가지고 있는 하나의 계정으로\n긱워킹, G워커를 위한 프로그램을 모두 이용하실 수 있습니다.",
  mobileDescription:
    "그릿지 회원이라면 가지고 있는 하나의 계정으로\n긱워킹, G워커를 위한 프로그램을\n모두 이용하실 수 있습니다.",
  button: {
    signUp: "그릿지 시작하기",
  },
}

export function SignUpForm() {
  const { mutateAsync: signup, isPending } = useSignUpMutation()
  const formik = useFormik<SignUpSchema>({
    validate: toFormikValidate(signUpValidationSchema),
    initialValues: {
      name: "",
      nickname: "",

      email: "",
      inputPassword: "",

      regionCode: "KR",
      phone: "",
      verificationCode: "",
      verificationDone: false,

      jobCategoryList: [],
      frameworkIdList: [],
      languageIdList: [],

      isPrivacyAccepted: false,
      isMarketingAccepted: false,
    },
    onSubmit: async (values) => {
      await signup({
        ...values,
        jobCategoryList: values.jobCategoryList.map((j) => ({
          jobCategoryId: j.jobCategoryId,
          roleIdList: j.roleIdList.map(Number),
        })),
        frameworkIdList: values.frameworkIdList.map(Number),
        languageIdList: values.languageIdList.map(Number),
        password: values.inputPassword,
      })

      NiceModal.show(SignUpSuccessModal)
    },
  })

  return (
    <Styled.Container>
      <VStack spacing="0.88rem" align="center">
        <VStack spacing="0.75rem" align="center">
          <Styled.LogoContainer>
            <Logo />
          </Styled.LogoContainer>
          <Styled.Title>{TEXT.title}</Styled.Title>
        </VStack>
        <Styled.Description>{TEXT.description}</Styled.Description>
        <Styled.MobileDescription>
          {TEXT.mobileDescription}
        </Styled.MobileDescription>
      </VStack>

      <FormikProvider value={formik}>
        <Styled.Form>
          <RealNameField />

          <NickNameField />

          <EmailField />

          <PasswordField />

          <PhoneVerifyField />

          <JobCategoryField />

          <RoleField />

          <FrameworkField />

          <LanguageField />

          <AgreementField />

          <Styled.SubmitButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty || isPending}>
            <Text>{TEXT.button.signUp}</Text>
          </Styled.SubmitButton>
        </Styled.Form>
      </FormikProvider>
    </Styled.Container>
  )
}
