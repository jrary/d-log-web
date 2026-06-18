import Checked from "~icons/local/ic_checkbox_check"
import * as Styled from "./styled"
import type { ComponentProps, PropsWithChildren } from "react"

type CheckboxProps = ComponentProps<typeof Styled.Checkbox>

export function Checkbox({
  children,
  ...props
}: PropsWithChildren<CheckboxProps>) {
  return (
    <Styled.Container>
      <Styled.Checkbox
        type="checkbox"
        {...props}
        checked={props.value ?? props.checked}
      />
      <Styled.CheckboxButton>
        <Checked />
      </Styled.CheckboxButton>
      {children}
    </Styled.Container>
  )
}
