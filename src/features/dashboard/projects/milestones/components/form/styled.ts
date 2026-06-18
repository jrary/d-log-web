import { VStack } from "@components/shared-components/stack"
import { BORDER } from "@components/shared-components/tokens/color"
import { ZIndex } from "@components/shared-components/tokens/z-index"
import { Form as FormikForm } from "formik"
import styled from "styled-components"

export const Form = styled(VStack).attrs({
  spacing: "1.25rem",
  as: FormikForm,
})`
  z-index: ${ZIndex.overlay};
`

export const Fields = styled(VStack).attrs({
  spacing: "1.9rem",
})``

export const Line = styled.div`
  border-bottom: 1px solid ${BORDER.LIGHT};
`
