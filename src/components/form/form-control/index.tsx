import { filterChild, findChild, toChildrenArray } from "@utils/children"
import { ErrorMessage } from "formik"
import * as Styled from "./styled"
import type { ComponentProps, ReactElement } from "react"

type FormControlProps = {
  children: ReactElement[]
} & ComponentProps<typeof Styled.Field>

function Container({ children, ...props }: FormControlProps) {
  const childArray = toChildrenArray(children)

  return (
    <Styled.Field {...props}>
      <Styled.LabelContainer>
        {findChild(childArray, Styled.Label)}
        {findChild(childArray, Styled.Description)}
      </Styled.LabelContainer>
      {findChild(childArray, Styled.Content)}
      {filterChild(childArray, ErrorMessage)}
      {filterChild(childArray, Styled.ErrorText)
        .filter(({ props }) => !!props.children)
        .map((element) => element)}
    </Styled.Field>
  )
}

export function renderErrorText(message: string) {
  return <Styled.ErrorText>{message}</Styled.ErrorText>
}

export const FormControl = {
  Field: Styled.Field,
  Container,
  Label: Styled.Label,
  Description: Styled.Description,
  Content: Styled.Content,
  ErrorText: Styled.ErrorText,
}
