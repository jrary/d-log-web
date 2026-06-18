import { FormControl, renderErrorText } from "@components/form/form-control"
import { Password } from "@components/form/password"
import { useFieldError } from "@hooks/formik"
import { ErrorMessage, useFormikContext } from "formik"
import type { SignUpSchema } from "@features/auth/sign-up/schemas/sign-up-validation-schema"

const TEXT = {
  title: "비밀번호",
  description: "영문, 숫자, 특수문자를 포함한 8자 이상의 문자열",
  placeholder: "비밀번호를 입력해 주세요",
}

export function PasswordField() {
  const hasError = useFieldError("inputPassword")
  const { getFieldProps } = useFormikContext<SignUpSchema>()

  return (
    <FormControl.Container>
      <FormControl.Label>{TEXT.title}</FormControl.Label>
      <FormControl.Description>{TEXT.description}</FormControl.Description>
      <FormControl.Content>
        <Password
          data-error={hasError}
          placeholder={TEXT.placeholder}
          {...getFieldProps("inputPassword")}
        />
      </FormControl.Content>
      <ErrorMessage name="inputPassword" render={renderErrorText} />
    </FormControl.Container>
  )
}
