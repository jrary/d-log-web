import * as Callout from "@components/callout.styled"
import { FormControl, renderErrorText } from "@components/form/form-control"
import { TextField } from "@components/form/text-field"
import { useFindPasswordMutation } from "@features/auth/find-account/queries/useFindPasswordMutation"
import { findPasswordValidationSchema } from "@features/auth/find-account/schemas/find-password-validation-schema"
import { ErrorMessage, FormikProvider, useFormik } from "formik"
import { toFormikValidate } from "zod-formik-adapter"
import * as Section from "./section.styled"

const TEXT = {
  title: "비밀번호 찾기",
  fields: {
    email: {
      label: "아이디 (이메일)",
      placeholder: "이메일을 입력해 주세요.",
    },
  },
  description:
    "본인인증 받으신 정보를 입력해 주세요.\n휴대폰 번호로 아이디(이메일주소)를 보내드립니다.",
  submit: "비밀번호 변경 URL 전송",
  response: {
    success: "가입하신 이메일 주소로 비밀번호 변경 URL이 전송되었습니다.",
    error: "이메일이 존재하지 않습니다.",
  },
}

type FindPasswordFormProps = {
  active?: boolean
}

export function FindPasswordForm({ active = true }: FindPasswordFormProps) {
  const { mutateAsync, data: response } = useFindPasswordMutation()
  const formik = useFormik({
    validate: toFormikValidate(findPasswordValidationSchema),
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      mutateAsync(values)
    },
  })

  const { getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Section.Container rowSpan={1} data-active={active}>
        <Section.Title>{TEXT.title}</Section.Title>
        <Section.Form onSubmit={formik.handleSubmit}>
          <Section.Fields>
            <FormControl.Container>
              <FormControl.Label>{TEXT.fields.email.label}</FormControl.Label>
              <FormControl.Content>
                <TextField.Root>
                  <TextField.Control
                    {...getFieldProps("email")}
                    data-error={!!formik.errors.email}
                    placeholder={TEXT.fields.email.placeholder}
                  />
                </TextField.Root>
              </FormControl.Content>
              <ErrorMessage name="email" render={renderErrorText} />
            </FormControl.Container>

            <Section.Description>{TEXT.description}</Section.Description>
          </Section.Fields>

          <Section.Fields>
            {response?.data.result?.isSuccess === true && (
              <Callout.Container variant="success">
                <Callout.Icon>✅</Callout.Icon>
                <Callout.Content>{TEXT.response.success}</Callout.Content>
              </Callout.Container>
            )}
            {response?.data.result?.isSuccess === false && (
              <Callout.Container variant="error">
                <Callout.Icon>⛔</Callout.Icon>
                <Callout.Content>{TEXT.response.error}</Callout.Content>
              </Callout.Container>
            )}

            <Section.Submit
              disabled={!formik.isValid || !formik.dirty}
              type="submit">
              {TEXT.submit}
            </Section.Submit>
          </Section.Fields>
        </Section.Form>
      </Section.Container>
    </FormikProvider>
  )
}
