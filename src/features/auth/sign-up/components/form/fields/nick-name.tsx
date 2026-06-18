import { FormControl, renderErrorText } from "@components/form/form-control"
import { TextField } from "@components/form/text-field"
import { useFieldError } from "@hooks/formik"
import { ErrorMessage, useFormikContext } from "formik"
import type { SignUpSchema } from "@features/auth/sign-up/schemas/sign-up-validation-schema"

const TEXT = {
  title: "닉네임",
  description: "추후 프로젝트 시작 시 그릿지 내의 활동명으로 사용됩니다.",
  placeholder: "닉네임을 10글자 이내로 입력해 주세요.",
}

export function NickNameField() {
  const hasError = useFieldError("nickname")
  const { getFieldProps } = useFormikContext<SignUpSchema>()

  return (
    <FormControl.Container>
      <FormControl.Label>{TEXT.title}</FormControl.Label>
      <FormControl.Description>{TEXT.description}</FormControl.Description>
      <FormControl.Content>
        <TextField.Root>
          <TextField.Control
            data-error={hasError}
            placeholder={TEXT.placeholder}
            {...getFieldProps("nickname")}
          />
        </TextField.Root>
      </FormControl.Content>
      <ErrorMessage name="nickname" render={renderErrorText} />
    </FormControl.Container>
  )
}
