import * as Callout from "@components/callout.styled"
import { FormControl, renderErrorText } from "@components/form/form-control"
import { Password } from "@components/form/password"
import { TextField } from "@components/form/text-field"
import { show } from "@ebay/nice-modal-react"
import { useWithdrawalMutation } from "@features/auth/change-password/queries/useWithdrawalMutation"
import { withdrawalValidationSchema } from "@features/auth/change-password/schemas/withdrawal-validation-schema"
import { WithdrawalSuccessModal } from "@features/auth/withdrawal/components/modals/withdrawal-success"
import { ErrorMessage, FormikProvider, useFormik } from "formik"
import { toFormikValidate } from "zod-formik-adapter"
import * as Styled from "./withdrawal-page.styled"

const TEXT = {
  title: "회원탈퇴",
  field: {
    label: "계정 확인",
    description:
      "안전한 회원탈퇴를 위해 계정 정보를 입력해주세요.\n탈퇴 시 계정 복구가 불가능합니다.",
    emailPlaceholder: "이메일을 입력해주세요.",
    passwordPlaceholder: "비밀번호를 입력해주세요.",
  },
  submit: "탈퇴하기",
}

export default function WithdrawalPage() {
  const { mutateAsync: withdrawal, error } = useWithdrawalMutation()
  const formik = useFormik({
    enableReinitialize: true,
    validate: toFormikValidate(withdrawalValidationSchema),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await withdrawal(values)
        show(WithdrawalSuccessModal)
      } catch {
        // noop
      }
    },
  })

  return (
    <FormikProvider value={formik}>
      <Styled.Page>
        <Styled.Title>{TEXT.title}</Styled.Title>

        <Styled.Container onSubmit={formik.handleSubmit}>
          <Styled.Form>
            <FormControl.Container>
              <FormControl.Label>{TEXT.field.label}</FormControl.Label>
              <FormControl.Description>
                {TEXT.field.description}
              </FormControl.Description>
              <FormControl.Content>
                <TextField.Root>
                  <TextField.Control
                    placeholder={TEXT.field.emailPlaceholder}
                    {...formik.getFieldProps("email")}
                  />
                </TextField.Root>
              </FormControl.Content>
              <ErrorMessage name="email" render={renderErrorText} />
            </FormControl.Container>

            <FormControl.Container>
              <FormControl.Content>
                <Password
                  {...formik.getFieldProps("password")}
                  placeholder={TEXT.field.passwordPlaceholder}
                  autoComplete="new-password"
                />
              </FormControl.Content>
              <ErrorMessage name="password" render={renderErrorText} />
            </FormControl.Container>
          </Styled.Form>

          {error && (
            <Callout.Container variant="error">
              <Callout.Icon>⛔</Callout.Icon>
              <Callout.Content>{error?.message}</Callout.Content>
            </Callout.Container>
          )}

          <Styled.Submit
            disabled={!formik.isValid || !formik.dirty}
            type="submit">
            {TEXT.submit}
          </Styled.Submit>
        </Styled.Container>
      </Styled.Page>
    </FormikProvider>
  )
}
