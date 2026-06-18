import { FormControl, renderErrorText } from "@components/form/form-control"
import { TextField } from "@components/form/text-field"
import { useFieldError } from "@hooks/formik"
import { ErrorMessage, useFormikContext } from "formik"
import type { SignUpSchema } from "@features/auth/sign-up/schemas/sign-up-validation-schema"

const TEXT = {
  title: "이메일",
  description:
    "실제로 사용하는 이메일을 적어주세요. 추후 로그인 시 아이디로 사용되며, 비밀번호 찾기 시 이메일로 비밀번호 변경이 가능합니다.",
  placeholder: "이메일을 입력해 주세요",
}

export function EmailField() {
  const hasError = useFieldError("email")
  const { getFieldProps } = useFormikContext<SignUpSchema>()

  return (
    <FormControl.Container>
      <FormControl.Label>{TEXT.title}</FormControl.Label>
      <FormControl.Description>{TEXT.description}</FormControl.Description>
      <FormControl.Content>
        <TextField.Root>
          <TextField.Control
            type="email"
            data-error={hasError}
            placeholder={TEXT.placeholder}
            {...getFieldProps("email")}
          />
        </TextField.Root>
      </FormControl.Content>
      <ErrorMessage name="email" render={renderErrorText} />
    </FormControl.Container>
  )
}
