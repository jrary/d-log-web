import { FormControl } from "@components/form/form-control"
import { VStack } from "@components/shared-components/stack"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  spacing: "1.88rem",
})``

export const FieldTitle = styled(FormControl.Container)`
  justify-content: start;
`
