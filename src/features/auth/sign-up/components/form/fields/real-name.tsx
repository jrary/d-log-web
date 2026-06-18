import { FormControl, renderErrorText } from "@components/form/form-control"
import { TextField } from "@components/form/text-field"
import { useFieldError } from "@hooks/formik"
import { ErrorMessage, useFormikContext } from "formik"
import type { SignUpSchema } from "@features/auth/sign-up/schemas/sign-up-validation-schema"

const TEXT = {
  title: "본명",
  placeholder: "본명을 입력해 주세요",
}

export function RealNameField() {
  const hasError = useFieldError("name")
  const { getFieldProps } = useFormikContext<SignUpSchema>()

  return (
    <FormControl.Container>
      <FormControl.Label>{TEXT.title}</FormControl.Label>
      <FormControl.Content>
        <TextField.Root>
          <TextField.Control
            data-error={hasError}
            placeholder={TEXT.placeholder}
            {...getFieldProps("name")}
          />
        </TextField.Root>
      </FormControl.Content>
      <ErrorMessage name="name" render={renderErrorText} />
    </FormControl.Container>
  )
}
