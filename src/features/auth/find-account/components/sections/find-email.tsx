import * as Callout from "@components/callout.styled"
import { FormControl, renderErrorText } from "@components/form/form-control"
import { IntlTel } from "@components/form/intl-tel"
import { TextField } from "@components/form/text-field"
import { useFindEmailMutation } from "@features/auth/find-account/queries/useFindEmailMutation"
import { findEmailValidationSchema } from "@features/auth/find-account/schemas/find-email-validation-schema"
import { ErrorMessage, FormikProvider, useFormik } from "formik"
import { toFormikValidate } from "zod-formik-adapter"
import * as Section from "./section.styled"

const TEXT = {
  title: "아이디 찾기",
  fields: {
    name: {
      label: "이름",
      placeholder: "이름을 입력해 주세요.",
    },
    phone: {
      label: "휴대폰 번호",
      placeholder: "휴대폰 번호를 입력해 주세요.",
    },
  },
  description:
    "본인인증 받으신 정보를 입력해 주세요.\n휴대폰 번호로 아이디(이메일주소)를 보내드립니다.",
  submit: "아이디(이메일 주소) 전송",
  response: {
    success: "입력하신 휴대폰 번호로 이메일 주소가 전송되었습니다.",
    error: "가입되지 않은 휴대폰 번호입니다.",
  },
}

type FindEmailFormProps = {
  active?: boolean
}

export function FindEmailForm({ active = true }: FindEmailFormProps) {
  const { mutateAsync, data: response } = useFindEmailMutation()
  const formik = useFormik({
    validate: toFormikValidate(findEmailValidationSchema),
    initialValues: {
      name: "",
      regionCode: "KR",
      phoneNumber: "",
    },
    onSubmit: async (values) => {
      mutateAsync(values)
    },
  })

  const { getFieldProps, setFieldValue, values } = formik

  return (
    <FormikProvider value={formik}>
      <Section.Container rowSpan={2} data-active={active}>
        <Section.Title>{TEXT.title}</Section.Title>
        <Section.Form onSubmit={formik.handleSubmit}>
          <Section.Fields>
            <FormControl.Container error={!!formik.errors.name}>
              <FormControl.Label>{TEXT.fields.name.label}</FormControl.Label>
              <FormControl.Content>
                <TextField.Root>
                  <TextField.Control
                    data-error={!!formik.errors.name}
                    placeholder={TEXT.fields.name.placeholder}
                    {...getFieldProps("name")}
                  />
                </TextField.Root>
              </FormControl.Content>
              <ErrorMessage name="name" render={renderErrorText} />
            </FormControl.Container>

            <FormControl.Container>
              <FormControl.Label>{TEXT.fields.phone.label}</FormControl.Label>
              <FormControl.Content>
                <IntlTel
                  data-error={!!formik.errors.phoneNumber}
                  placeholder={TEXT.fields.phone.placeholder}
                  number={values.phoneNumber}
                  onChangeNumber={(value) => {
                    setFieldValue("phoneNumber", value)
                  }}
                  regionCode={values.regionCode}
                  onChangeRegionCode={(value) => {
                    setFieldValue("regionCode", value)
                  }}
                />
              </FormControl.Content>
              <ErrorMessage name="phoneNumber" render={renderErrorText} />
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
