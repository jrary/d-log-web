import { ICON } from "@components/shared-components/tokens/color"
import Checked from "~icons/local/ic_check"
import * as Styled from "./select-box.styled"
import type { ComponentProps } from "react"

type CheckboxProps = ComponentProps<typeof Styled.Checkbox> & {
  label: string
}

export function SelectBox({ label, ...props }: CheckboxProps) {
  return (
    <Styled.Container>
      <Styled.Checkbox type="checkbox" {...props} />
      <Styled.Label>{label}</Styled.Label>
      <Styled.Checked>
        <Checked color={ICON.PRIMARY} />
      </Styled.Checked>
    </Styled.Container>
  )
}
