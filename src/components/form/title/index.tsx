import { findChild, toChildrenArray } from "@utils/children"
import { forwardRef } from "react"
import * as Styled from "./styled"
import type { ReactElement } from "react"

type TitleFieldProps = {
  children: ReactElement | ReactElement[]
}

const Root = forwardRef<HTMLInputElement, TitleFieldProps>(
  ({ children }, ref) => {
    const childArray = toChildrenArray<ReactElement>(children)

    return (
      <Styled.Container ref={ref}>
        {findChild(childArray, Styled.Control)}
      </Styled.Container>
    )
  },
)

export const TitleField = {
  Root,
  Container: Styled.Container,
  Control: Styled.Control,
}
