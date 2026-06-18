import * as Callout from "@components/callout.styled"
import { FormControl, renderErrorText } from "@components/form/form-control"
import { Password } from "@components/form/password"
import { VStack } from "@components/shared-components/stack"
import { show } from "@ebay/nice-modal-react"
import { ChangePasswordSuccessModal } from "@features/auth/change-password/components/modals/change-password-success"
import * as Styled from "@features/auth/change-password/components/styled"
import { useChangePasswordMutation } from "@features/auth/change-password/queries/useChangePasswordMutation"
import { changePasswordValidationSchema } from "@features/auth/change-password/schemas/change-password-validation-schema"
import { ErrorMessage, FormikProvider, useFormik } from "formik"
import { useLayoutEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate, useSearchParams } from "react-router"
import { toFormikValidate } from "zod-formik-adapter"

const TEXT = {
  title: "비밀번호 변경",
  fields: {
    password: {
      label: "새 비밀번호",
      description: "영문, 숫자, 특수문자를 포함한 8자 이상의 문자열",
      placeholder: "새 비밀번호를 입력해 주세요.",
    },
  },
  submit: "비밀번호 변경",
}

export default function ChangePasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { mutateAsync: changePassword, error } = useChangePasswordMutation()
  const formik = useFormik({
    enableReinitialize: true,
    validate: toFormikValidate(changePasswordValidationSchema),
    initialValues: {
      sessionCode: searchParams.get("sessionCode") ?? "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await changePassword(values)
        show(ChangePasswordSuccessModal)
      } catch {
        // noop
      }
    },
  })

  useLayoutEffect(
    function blockInvalidAccess() {
      if (formik.values.sessionCode) {
        navigate("/")
        toast.error("잘못된 접근입니다.")
      }
    },
    [formik.values.sessionCode, navigate],
  )

  return (
    <VStack>
      <FormikProvider value={formik}>
        <Styled.Page>
          <Styled.Title>{TEXT.title}</Styled.Title>

          <Styled.Container onSubmit={formik.handleSubmit}>
            <Styled.Form>
              <input
                hidden
                type="text"
                name="username"
                autoComplete="username"
              />

              <FormControl.Container>
                <FormControl.Label>
                  {TEXT.fields.password.label}
                </FormControl.Label>
                <FormControl.Description>
                  {TEXT.fields.password.description}
                </FormControl.Description>
                <FormControl.Content>
                  <Password
                    {...formik.getFieldProps("password")}
                    data-error={!!formik.errors.password}
                    placeholder={TEXT.fields.password.placeholder}
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
    </VStack>
  )
}
