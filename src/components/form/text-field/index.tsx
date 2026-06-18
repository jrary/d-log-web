import { TimeInput } from "@features/dashboard/projects/my-works/components/time-input"
import { filterChild, findChild, toChildrenArray } from "@utils/children"
import { forwardRef } from "react"
import * as Styled from "./styled"
import type { ReactElement } from "react"

type TextFieldProps = {
  children: ReactElement | ReactElement[]
}

const Root = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ children }, ref) => {
    const childArray = toChildrenArray<ReactElement>(children)

    const slotArray = filterChild(childArray, Styled.Slot)
    const leftContent = slotArray.filter(
      ({ props }) =>
        props.direction === "left" || props.direction === undefined,
    )
    const rightContent = slotArray.filter(
      ({ props }) => props.direction === "right",
    )

    return (
      <Styled.Container ref={ref}>
        {leftContent}
        {findChild(childArray, Styled.Control)}
        {findChild(childArray, TimeInput)}
        {rightContent}
      </Styled.Container>
    )
  },
)

export const TextField = {
  Root,
  Container: Styled.Container,
  Control: Styled.Control,
  Slot: Styled.Slot,
}
